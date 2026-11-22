import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { normalizeOutput, outputsMatch } from "./compare";
import { gradeResults, type JudgeTest } from "./grade";
import { judge0Headers, mapJudge0Response } from "./judge0";
import { createLocalDevRunner } from "./local-dev-runner";
import type { RunResult } from "./types";
import { parseProblemFile } from "../problem-parser";

const ok = (stdout: string, timeMs = 5): RunResult => ({ status: "ok", stdout, stderr: "", compileOutput: "", timeMs, memoryKb: 900 });
const tests: JudgeTest[] = [
  { input: "2 3\n", output: "5\n", hidden: false },
  { input: "10 20\n", output: "30\n", hidden: true },
  { input: "-1 1\n", output: "0\n", hidden: true },
];

describe("output comparison", () => {
  it("ignores invisible whitespace differences only", () => {
    expect(outputsMatch("5\r\n", "5\n")).toBe(true);
    expect(outputsMatch("1 2   \n3\n\n\n", "1 2\n3")).toBe(true);
    expect(outputsMatch("5", "6")).toBe(false);
    expect(outputsMatch(" 5", "5")).toBe(false);
    expect(outputsMatch("YES", "yes")).toBe(false);
    expect(normalizeOutput("a\t\nb")).toBe("a\nb");
  });
});

describe("gradeResults", () => {
  it("accepts when every test passes", () => {
    const g = gradeResults(tests, [ok("5\n"), ok("30"), ok("0\n", 12)]);
    expect(g).toMatchObject({ verdict: "accepted", passed: 3, total: 3, maxTimeMs: 12, maxMemoryKb: 900 });
  });

  it("reports the first failing test's reason", () => {
    expect(gradeResults(tests, [ok("5"), ok("31"), ok("0")]).verdict).toBe("wrong_answer");
    const tle: RunResult = { ...ok(""), status: "time_limit" };
    const rte: RunResult = { ...ok(""), status: "runtime_error" };
    expect(gradeResults(tests, [ok("5"), tle, rte]).verdict).toBe("time_limit");
    expect(gradeResults(tests, [ok("5"), rte, tle]).verdict).toBe("runtime_error");
  });

  it("never reveals hidden test data", () => {
    const g = gradeResults(tests, [ok("5"), ok("31"), ok("0")]);
    const hidden = g.outcomes.filter((o) => o.hidden);
    expect(hidden).toHaveLength(2);
    for (const o of hidden) {
      expect(o.input).toBeUndefined();
      expect(o.expected).toBeUndefined();
      expect(o.actual).toBeUndefined();
    }
    expect(JSON.stringify(g)).not.toContain("10 20");
    expect(g.outcomes[0]).toMatchObject({ input: "2 3\n", expected: "5\n", actual: "5" });
  });

  it("stops at a compile error", () => {
    const ce: RunResult = { ...ok(""), status: "compile_error", compileOutput: "main.c:3: error: expected ';'" };
    const g = gradeResults(tests, [ce, ce, ce]);
    expect(g).toMatchObject({ verdict: "compile_error", passed: 0, outcomes: [] });
    expect(g.compileOutput).toContain("expected ';'");
  });

  it("clips very long output", () => {
    const g = gradeResults([tests[0]], [ok("x".repeat(5000))]);
    expect(g.outcomes[0].actual!.length).toBeLessThan(2100);
  });
});

describe("Judge0 adapter", () => {
  const b = (s: string) => Buffer.from(s).toString("base64");
  it("maps statuses and decodes base64", () => {
    expect(mapJudge0Response({ status: { id: 3 }, stdout: b("5\n"), time: "0.012", memory: 1024 }))
      .toMatchObject({ status: "ok", stdout: "5\n", timeMs: 12, memoryKb: 1024 });
    expect(mapJudge0Response({ status: { id: 5 } }).status).toBe("time_limit");
    expect(mapJudge0Response({ status: { id: 6 }, compile_output: b("error") })).toMatchObject({ status: "compile_error", compileOutput: "error" });
    expect(mapJudge0Response({ status: { id: 11, description: "Runtime Error (NZEC)" } }).status).toBe("runtime_error");
    expect(mapJudge0Response({ status: { id: 13 } }).status).toBe("internal_error");
  });
  it("uses the right auth header for each host", () => {
    expect(judge0Headers("https://judge0-ce.p.rapidapi.com", "k")).toMatchObject({ "X-RapidAPI-Key": "k", "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com" });
    expect(judge0Headers("https://judge.example.in", "t")).toMatchObject({ "X-Auth-Token": "t" });
    expect(judge0Headers("http://localhost:2358")).not.toHaveProperty("X-Auth-Token");
  });
});

let hasGcc = true;
try { execFileSync("gcc", ["--version"], { stdio: "ignore" }); } catch { hasGcc = false; }

describe.skipIf(!hasGcc)("end to end with the local gcc runner", () => {
  const runner = createLocalDevRunner();
  const limits = { timeLimitMs: 1000, memoryKb: 65536 };
  const problem = parseProblemFile("sum-two-numbers",
    readFileSync(join(process.cwd(), "supabase", "problems", "foundations", "01-sum-two-numbers.md"), "utf8"));
  const stdins = problem.tests.map((t) => t.input);

  it("accepts the reference solution", async () => {
    const g = gradeResults(problem.tests, await runner.runBatch(problem.solution, stdins, limits));
    expect(g.verdict).toBe("accepted");
    expect(g.passed).toBe(problem.tests.length);
  }, 60_000);

  it("rejects the unfinished starter code", async () => {
    const g = gradeResults(problem.tests, await runner.runBatch(problem.starter, stdins, limits));
    expect(g.verdict).toBe("wrong_answer");
  }, 60_000);

  it("reports compile errors and infinite loops", async () => {
    const ce = gradeResults([problem.tests[0]], await runner.runBatch("int main(void) { return 0 }", [stdins[0]], limits));
    expect(ce.verdict).toBe("compile_error");
    const loop = await runner.runBatch("int main(void) { for (;;) {} }", ["\n"], { timeLimitMs: 300, memoryKb: 65536 });
    expect(loop[0].status).toBe("time_limit");
  }, 60_000);
});
