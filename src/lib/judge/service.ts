import "server-only";
import type { Json, Problem } from "@/lib/database.types";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getViewer, type Viewer } from "@/lib/auth/session";
import { canAccessPlan } from "@/lib/plans";
import { rateLimit, rateLimitKey } from "@/lib/rate-limit";
import { clip, gradeResults, type GradeResult } from "./grade";
import { getRunner } from "./runner";
import { JudgeUnavailableError, type RunResult } from "./types";

export class JudgeRequestError extends Error {
  constructor(message: string, readonly status: number) { super(message); }
}

type Limits = { count: number; windowSeconds: number }[];
export const RUN_LIMITS: Limits = [{ count: 30, windowSeconds: 300 }];
export const SUBMIT_LIMITS: Limits = [{ count: 10, windowSeconds: 300 }, { count: 150, windowSeconds: 86_400 }];

async function enforce(kind: "run" | "submit", userId: string, limits: Limits) {
  for (const l of limits) {
    const r = await rateLimit(rateLimitKey(`judge-${kind}`, userId, String(l.windowSeconds)), l.count, l.windowSeconds);
    if (!r.allowed) {
      const wait = Math.max(1, Math.ceil((r.resetAt.getTime() - Date.now()) / 1000));
      throw new JudgeRequestError(`You've reached the limit of ${l.count} ${kind}s. Try again in ${wait > 120 ? Math.ceil(wait / 60) + " minutes" : wait + " seconds"}.`, 429);
    }
  }
}

/** Loads a published problem the viewer is allowed to attempt. RLS hides drafts; the plan check is done here. */
async function loadProblem(slug: string): Promise<{ viewer: Viewer; problem: Problem }> {
  const viewer = await getViewer();
  if (!viewer) throw new JudgeRequestError("Sign in to run code.", 401);
  const supabase = await createClient();
  const { data: problem } = await supabase.from("problems").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
  if (!problem) throw new JudgeRequestError("Problem not found.", 404);
  if (!canAccessPlan(viewer.plan, problem.required_plan)) throw new JudgeRequestError("This problem is part of a paid plan.", 403);
  return { viewer, problem };
}

/** Test cases, read with the service role because hidden tests are invisible to learners under RLS. */
async function loadTests(problemId: string, includeHidden: boolean) {
  let q = createAdminClient().from("test_cases").select("input, expected_output, is_hidden").eq("problem_id", problemId).order("position");
  if (!includeHidden) q = q.eq("is_hidden", false);
  const { data, error } = await q;
  if (error) throw new Error(`could not load tests: ${error.message}`);
  return (data ?? []).map((t) => ({ input: t.input, output: t.expected_output, hidden: t.is_hidden }));
}

export type RunResponse =
  | { kind: "custom"; status: RunResult["status"]; stdout: string; stderr: string; compileOutput: string; timeMs: number | null }
  | ({ kind: "samples" } & GradeResult);

export async function runCode(slug: string, source: string, stdin?: string): Promise<RunResponse> {
  const { viewer, problem } = await loadProblem(slug);
  await enforce("run", viewer.id, RUN_LIMITS);
  const limits = { timeLimitMs: problem.time_limit_ms, memoryKb: problem.memory_kb };
  const runner = getRunner();

  if (stdin !== undefined) {
    const [r] = await runner.runBatch(source, [stdin], limits);
    return { kind: "custom", status: r.status, stdout: clip(r.stdout), stderr: clip(r.stderr, 1000), compileOutput: clip(r.compileOutput, 8000), timeMs: r.timeMs };
  }
  const tests = await loadTests(problem.id, false);
  const results = await runner.runBatch(source, tests.map((t) => t.input), limits);
  return { kind: "samples", ...gradeResults(tests, results) };
}

export type SubmitResponse = GradeResult & { submissionId: string; firstSolve: boolean; xp: number };

export async function submitCode(slug: string, source: string): Promise<SubmitResponse> {
  const { viewer, problem } = await loadProblem(slug);
  await enforce("submit", viewer.id, SUBMIT_LIMITS);
  const tests = await loadTests(problem.id, true);
  if (tests.length === 0) throw new JudgeRequestError("This problem has no tests yet.", 409);

  const results = await getRunner().runBatch(source, tests.map((t) => t.input), { timeLimitMs: problem.time_limit_ms, memoryKb: problem.memory_kb });
  const grade = gradeResults(tests, results);

  const admin = createAdminClient();
  const { data: saved, error } = await admin.from("submissions").insert({
    user_id: viewer.id, problem_id: problem.id, source_code: source, status: grade.verdict,
    passed: grade.passed, total: grade.total, runtime_ms: grade.maxTimeMs, memory_kb: grade.maxMemoryKb,
    compile_output: grade.compileOutput, details: grade.outcomes as unknown as Json,
  }).select("id").single();
  if (error || !saved) throw new Error(`could not save submission: ${error?.message}`);

  let firstSolve = false;
  if (grade.verdict === "accepted") {
    const { data } = await admin.rpc("credit_problem_solved", { p_submission: saved.id });
    firstSolve = data === true;
  }
  return { ...grade, submissionId: saved.id, firstSolve, xp: firstSolve ? problem.xp : 0 };
}

/** Maps any error to a safe HTTP response body. Internal details are logged, not returned. */
export function judgeErrorResponse(e: unknown): { status: number; body: { error: string } } {
  if (e instanceof JudgeRequestError) return { status: e.status, body: { error: e.message } };
  if (e instanceof JudgeUnavailableError) {
    console.error("judge unavailable:", e.message);
    return { status: 503, body: { error: e.message.startsWith("The code runner isn't set up") ? e.message : "The code runner is unavailable right now. Try again in a minute." } };
  }
  console.error("judge request failed:", e);
  return { status: 500, body: { error: "Something went wrong while judging. Try again." } };
}
