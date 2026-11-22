/**
 * Verifies every problem in supabase/problems/:
 *  - the starter code compiles (it may be incomplete, but must be valid C)
 *  - the reference solution compiles and passes every sample and hidden test
 *   npm run problems:check
 * Needs gcc on the PATH. Runs only trusted code from this repository.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parseProblemFile } from "../src/lib/problem-parser.ts";
import { outputsMatch } from "../src/lib/judge/compare.ts";
import { listProblemFiles } from "./problem-files.ts";

const only = process.argv[2]; // optional module folder
const work = mkdtempSync(join(tmpdir(), "cmp-"));
const failures: string[] = [];
const seen = new Set<string>();
let tests = 0, problems = 0;

for (const f of listProblemFiles()) {
  if (only && f.folder !== only) continue;
  const slug = f.slug;
  if (seen.has(slug)) { failures.push(`${slug}: the same slug is used by two files`); continue; }
  seen.add(slug);
  let p;
  try {
    p = parseProblemFile(slug, readFileSync(f.path, "utf8"), { defaultModule: f.folder });
  } catch (e) {
    failures.push((e as Error).message);
    continue;
  }
  problems++;

  const starter = join(work, `${slug}-starter.c`);
  writeFileSync(starter, p.starter);
  try {
    execFileSync("gcc", ["-fsyntax-only", "-std=c11", starter], { stdio: "pipe" });
  } catch (e) {
    failures.push(`${slug}: starter does not compile\n${String((e as { stderr?: Buffer }).stderr)}`);
  }

  const src = join(work, `${slug}.c`), exe = join(work, `${slug}.exe`);
  writeFileSync(src, p.solution);
  try {
    // Old MinGW builds wrongly reject %lld in scanf; the Linux gcc used by Judge0 accepts it.
    // SSE floating point matches Judge0's 64-bit Linux gcc; 32-bit x87 maths can change the last printed digit.
    const windowsQuirk = process.platform === "win32" ? ["-Wno-format", "-Wno-format-extra-args", "-msse2", "-mfpmath=sse"] : [];
    execFileSync("gcc", ["-std=c11", "-O2", "-Wall", "-Wextra", "-Werror", ...windowsQuirk, "-D__USE_MINGW_ANSI_STDIO=1", src, "-o", exe, "-lm"], { stdio: "pipe" });
  } catch (e) {
    failures.push(`${slug}: solution does not compile\n${String((e as { stderr?: Buffer }).stderr)}`);
    continue;
  }

  p.tests.forEach((t, i) => {
    tests++;
    const started = Date.now();
    const run = spawnSync(exe, { input: t.input, encoding: "utf8", timeout: p.timeLimitMs * 3 });
    const ms = Date.now() - started;
    const label = `${slug} test ${i + 1} (${t.hidden ? "hidden" : "sample"})`;
    if (run.error) failures.push(`${label}: ${run.error.message}`);
    else if (run.status !== 0) failures.push(`${label}: exit code ${run.status}`);
    else if (!outputsMatch(run.stdout, t.output)) failures.push(`${label}: wrong output\n--- expected\n${t.output}--- got\n${run.stdout}`);
    else if (ms > p.timeLimitMs) failures.push(`${label}: took ${ms} ms, limit ${p.timeLimitMs} ms`);
  });
}

rmSync(work, { recursive: true, force: true });
console.log(`Checked ${problems} problems and ${tests} tests. ${failures.length} failure(s).`);
for (const f of failures) console.log("\n" + f);
process.exit(failures.length ? 1 : 0);
