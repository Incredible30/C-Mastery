import type { SubmissionStatus } from "@/lib/database.types";
import { outputsMatch } from "./compare";
import type { RunResult, RunStatus } from "./types";

export type JudgeTest = { input: string; output: string; hidden: boolean };

/** What the learner may see about one test. Hidden tests never include input, expected or actual output. */
export type TestOutcome = {
  index: number;
  hidden: boolean;
  passed: boolean;
  status: RunStatus | "wrong_answer";
  timeMs: number | null;
  input?: string;
  expected?: string;
  actual?: string;
  stderr?: string;
};

export type GradeResult = {
  verdict: SubmissionStatus;
  passed: number;
  total: number;
  outcomes: TestOutcome[];
  compileOutput: string | null;
  maxTimeMs: number | null;
  maxMemoryKb: number | null;
};

const MAX_SHOWN = 2000;
export const clip = (s: string, n = MAX_SHOWN) => (s.length > n ? s.slice(0, n) + `\n… (${s.length - n} more characters)` : s);

const VERDICT_FOR: Record<TestOutcome["status"], SubmissionStatus> = {
  ok: "accepted", wrong_answer: "wrong_answer", compile_error: "compile_error",
  runtime_error: "runtime_error", time_limit: "time_limit", internal_error: "internal_error",
};

export function gradeResults(tests: JudgeTest[], results: RunResult[]): GradeResult {
  if (results.length !== tests.length) throw new Error("result count does not match test count");
  const compileError = results.find((r) => r.status === "compile_error");
  if (compileError) {
    return {
      verdict: "compile_error", passed: 0, total: tests.length, outcomes: [],
      compileOutput: clip(compileError.compileOutput || compileError.stderr || "Compilation failed", 8000),
      maxTimeMs: null, maxMemoryKb: null,
    };
  }

  const outcomes = tests.map((t, i): TestOutcome => {
    const r = results[i];
    const status: TestOutcome["status"] = r.status === "ok" ? (outputsMatch(r.stdout, t.output) ? "ok" : "wrong_answer") : r.status;
    const outcome: TestOutcome = { index: i + 1, hidden: t.hidden, passed: status === "ok", status, timeMs: r.timeMs };
    if (!t.hidden) {
      outcome.input = clip(t.input);
      outcome.expected = clip(t.output);
      outcome.actual = clip(r.stdout);
      if (r.stderr) outcome.stderr = clip(r.stderr, 1000);
    }
    return outcome;
  });

  const firstFail = outcomes.find((o) => !o.passed);
  const times = results.map((r) => r.timeMs).filter((n): n is number => n !== null);
  const mems = results.map((r) => r.memoryKb).filter((n): n is number => n !== null);
  return {
    verdict: firstFail ? VERDICT_FOR[firstFail.status] : "accepted",
    passed: outcomes.filter((o) => o.passed).length,
    total: tests.length,
    outcomes,
    compileOutput: null,
    maxTimeMs: times.length ? Math.max(...times) : null,
    maxMemoryKb: mems.length ? Math.max(...mems) : null,
  };
}

export const VERDICT_LABEL: Record<SubmissionStatus, string> = {
  queued: "Queued", running: "Running", accepted: "Accepted", wrong_answer: "Wrong answer",
  compile_error: "Compilation error", runtime_error: "Runtime error", time_limit: "Time limit exceeded",
  internal_error: "Judge error",
};
