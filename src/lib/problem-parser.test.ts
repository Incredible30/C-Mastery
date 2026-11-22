import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { parseProblemFile, problemSlugFromFile } from "./problem-parser";

const FENCE = "```";
const sample = [
  "---", "title: Sum of Two", "difficulty: easy", "topic: Basics", "module: foundations", "xp: 10", "plan: free", "---",
  "Read two integers and print their sum on one line.", "", "## Hints", "", "1. Use scanf.", "2. Use long long.", "",
  `${FENCE}c starter`, "int main(void) { return 0; }", FENCE, "",
  `${FENCE}c solution`, "#include <stdio.h>", "int main(void) { return 0; }", FENCE, "",
  `${FENCE}test sample`, "2 3", "---", "5", FENCE, "",
  `${FENCE}test hidden`, "-1 1", "---", "0", FENCE, "",
].join("\r\n");

describe("problemSlugFromFile", () => {
  it("reads the slug", () => {
    expect(problemSlugFromFile("01-sum-two-numbers.md")).toBe("sum-two-numbers");
    expect(problemSlugFromFile("sum.md")).toBeNull();
  });
});

describe("parseProblemFile", () => {
  it("separates statement, hints, code and tests", () => {
    const p = parseProblemFile("sum-two", sample);
    expect(p).toMatchObject({ title: "Sum of Two", difficulty: "easy", topic: "Basics", module: "foundations", xp: 10, plan: "free", timeLimitMs: 2000 });
    expect(p.statement).toBe("Read two integers and print their sum on one line.\n");
    expect(p.hints).toEqual(["Use scanf.", "Use long long."]);
    expect(p.starter).toContain("int main");
    expect(p.solution).toContain("#include");
    expect(p.tests).toEqual([
      { input: "2 3\n", output: "5\n", hidden: false },
      { input: "-1 1\n", output: "0\n", hidden: true },
    ]);
  });

  it("never leaks the solution or hidden tests into the statement", () => {
    const p = parseProblemFile("sum-two", sample);
    expect(p.statement).not.toContain("solution");
    expect(p.statement).not.toContain("-1 1");
  });

  it.each([
    ["difficulty: easy", "difficulty: tricky", /difficulty/],
    ["xp: 10", "xp: lots", /xp/],
    [`${FENCE}test hidden`, `${FENCE}text hidden`, /hidden/],
    [`${FENCE}c solution`, `${FENCE}c notes`, /solution/],
  ])("rejects bad input (%s → %s)", (from, to, err) => {
    expect(() => parseProblemFile("sum-two", sample.replace(from, to))).toThrow(err);
  });
});

describe("missing outputs", () => {
  const noOutput = sample.replace("-1 1\r\n---\r\n0", "-1 1");
  it("are rejected normally", () => {
    expect(() => parseProblemFile("sum-two", noOutput)).toThrow(/problems:build/);
  });
  it("are flagged when allowed, and the module can come from the folder", () => {
    const p = parseProblemFile("sum-two", noOutput.replace("module: foundations\r\n", ""), { allowMissingOutput: true, defaultModule: "basics" });
    expect(p.tests[1]).toMatchObject({ input: "-1 1\n", needsOutput: true });
    expect(p.module).toBe("basics");
  });
});

describe("problem files", () => {
  const root = join(process.cwd(), "supabase", "problems");
  const problems = readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory()).flatMap((d) =>
    readdirSync(join(root, d.name)).filter((f) => problemSlugFromFile(f)).map((f) =>
      parseProblemFile(problemSlugFromFile(f)!, readFileSync(join(root, d.name, f), "utf8"), { defaultModule: d.name })));

  it("parse without errors and have unique slugs", () => {
    expect(problems.length).toBeGreaterThanOrEqual(12);
    expect(new Set(problems.map((p) => p.slug)).size).toBe(problems.length);
  });

  it("each have hints and at least two hidden tests", () => {
    for (const p of problems) {
      expect(p.hints.length, p.slug).toBeGreaterThanOrEqual(2);
      expect(p.tests.filter((t) => t.hidden).length, p.slug).toBeGreaterThanOrEqual(2);
    }
  });
});
