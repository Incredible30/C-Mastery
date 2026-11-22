/**
 * Practice problems live in supabase/problems/NN-<slug>.md. One file holds everything:
 *
 *   ---
 *   title: Sum of Two Numbers
 *   difficulty: easy            easy | medium | hard
 *   topic: Basics
 *   module: foundations         optional module slug
 *   xp: 10
 *   plan: free                  free | pro | premium
 *   time_limit_ms: 2000         optional
 *   ---
 *   Statement in Markdown...
 *
 *   ## Hints
 *   1. First hint
 *   2. Second hint
 *
 *   ```c starter          code shown in the editor
 *   ```c solution         reference solution, never uploaded
 *   ```test sample        visible example: input, a line with ---, expected output
 *   ```test hidden        judged but never shown
 *
 * No imports, so Node scripts can run this file directly.
 */

export type Difficulty = "easy" | "medium" | "hard";
export type Plan = "free" | "pro" | "premium";
/** `needsOutput` is set only when parsing with allowMissingOutput and a test block has no `---` line yet. */
export type ProblemTest = { input: string; output: string; hidden: boolean; needsOutput?: boolean };
export type ParseOptions = { defaultModule?: string; allowMissingOutput?: boolean };
export type ParsedProblem = {
  slug: string; title: string; difficulty: Difficulty; topic: string; module: string | null;
  xp: number; plan: Plan; timeLimitMs: number; memoryKb: number;
  statement: string; hints: string[]; starter: string; solution: string; tests: ProblemTest[];
};

export function problemSlugFromFile(fileName: string): string | null {
  const m = /^\d{2,3}-([a-z0-9-]{2,80})\.md$/.exec(fileName);
  return m ? m[1] : null;
}

function fail(slug: string, msg: string): never {
  throw new Error(`${slug}: ${msg}`);
}

export function parseProblemFile(slug: string, raw: string, opts: ParseOptions = {}): ParsedProblem {
  const text = raw.replace(/\r\n/g, "\n");
  const fm = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (!fm) fail(slug, "missing front matter between --- lines");
  const meta: Record<string, string> = {};
  for (const line of fm[1].split("\n")) {
    const m = /^([a-z_]+):\s*(.*)$/.exec(line.trim());
    if (m) meta[m[1]] = m[2].trim();
  }

  const body = text.slice(fm[0].length);
  const fences = [...body.matchAll(/^```([^\n]*)\n([\s\S]*?)^```[ \t]*$/gm)];
  let starter = "", solution = "";
  const tests: ProblemTest[] = [];
  let prose = body;
  for (const f of fences) {
    const info = f[1].trim().split(/\s+/);
    const content = f[2];
    let consumed = true;
    if (info[0] === "c" && info[1] === "starter") starter = content;
    else if (info[0] === "c" && info[1] === "solution") solution = content;
    else if (info[0] === "test" && (info[1] === "sample" || info[1] === "hidden")) {
      const parts = content.split(/^---[ \t]*$/m);
      const hidden = info[1] === "hidden";
      if (parts.length === 1 && opts.allowMissingOutput) {
        const input = parts[0];
        tests.push({ input: input.endsWith("\n") || input === "" ? input : input + "\n", output: "", hidden, needsOutput: true });
      } else {
        if (parts.length !== 2) fail(slug, "a test block needs input, a line with ---, then the expected output (run npm run problems:build)");
        const input = parts[0].replace(/^\n/, "");
        const output = parts[1].replace(/^\n/, "");
        tests.push({ input: input.endsWith("\n") || input === "" ? input : input + "\n", output, hidden });
      }
    } else consumed = false;
    if (consumed) prose = prose.replace(f[0], "");
  }

  const hintsAt = prose.search(/^## Hints[ \t]*$/m);
  let statement = prose, hints: string[] = [];
  if (hintsAt >= 0) {
    statement = prose.slice(0, hintsAt);
    const after = prose.slice(hintsAt).split("\n").slice(1);
    const end = after.findIndex((l) => /^## /.test(l));
    hints = (end >= 0 ? after.slice(0, end) : after)
      .map((l) => /^\d+\.\s+(.+)$/.exec(l.trim())?.[1])
      .filter((h): h is string => !!h);
  }
  statement = statement.replace(/\n{3,}/g, "\n\n").trim() + "\n";

  const difficulty = meta.difficulty as Difficulty;
  const plan = (meta.plan || "free") as Plan;
  const xp = Number(meta.xp);
  const timeLimitMs = meta.time_limit_ms ? Number(meta.time_limit_ms) : 2000;
  const memoryKb = meta.memory_kb ? Number(meta.memory_kb) : 65536;

  if (!/^[a-z0-9-]{2,80}$/.test(slug)) fail(slug, "slug must be 2–80 lowercase letters, numbers or hyphens");
  if (!meta.title || meta.title.length < 2 || meta.title.length > 160) fail(slug, "title is missing or too long");
  if (!["easy", "medium", "hard"].includes(difficulty)) fail(slug, "difficulty must be easy, medium or hard");
  if (!["free", "pro", "premium"].includes(plan)) fail(slug, "plan must be free, pro or premium");
  if (!meta.topic) fail(slug, "topic is missing");
  if (!Number.isInteger(xp) || xp < 0 || xp > 500) fail(slug, "xp must be a whole number from 0 to 500");
  if (!Number.isInteger(timeLimitMs) || timeLimitMs < 100 || timeLimitMs > 10000) fail(slug, "time_limit_ms must be 100–10000");
  if (!Number.isInteger(memoryKb) || memoryKb < 1024 || memoryKb > 524288) fail(slug, "memory_kb must be 1024–524288");
  if (!starter.trim()) fail(slug, "missing ```c starter block");
  if (!solution.trim()) fail(slug, "missing ```c solution block");
  if (!tests.some((t) => !t.hidden)) fail(slug, "needs at least one ```test sample block");
  if (!tests.some((t) => t.hidden)) fail(slug, "needs at least one ```test hidden block");
  if (statement.trim().length < 20) fail(slug, "statement is too short");

  return {
    slug, title: meta.title, difficulty, topic: meta.topic, module: meta.module || opts.defaultModule || null, xp, plan, timeLimitMs, memoryKb,
    statement, hints, starter, solution, tests,
  };
}
