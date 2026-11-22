/**
 * Fills in expected outputs for problem tests written as input only:
 *
 *   ```test hidden
 *   5 7
 *   ```
 *
 * It compiles the problem's reference solution, runs it on each such input, and writes the result
 * back into the file after a --- line. Tests that already have an output are left alone.
 *   npm run problems:build           all modules
 *   npm run problems:build -- pointers   one module folder
 * Needs gcc. Runs only the trusted reference solutions in this repository.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parseProblemFile } from "../src/lib/problem-parser.ts";
import { listProblemFiles } from "./problem-files.ts";

const only = process.argv[2];
const work = mkdtempSync(join(tmpdir(), "cmb-"));
let filled = 0;
const errors: string[] = [];

for (const f of listProblemFiles()) {
  if (only && f.folder !== only) continue;
  const raw = readFileSync(f.path, "utf8").replace(/\r\n/g, "\n");
  let p;
  try {
    p = parseProblemFile(f.slug, raw, { allowMissingOutput: true, defaultModule: f.folder });
  } catch (e) {
    errors.push((e as Error).message);
    continue;
  }
  if (!p.tests.some((t) => t.needsOutput)) continue;

  const src = join(work, `${f.slug}.c`), exe = join(work, `${f.slug}.exe`);
  writeFileSync(src, p.solution);
  try {
    // On 32-bit Windows gcc, force SSE floating point so decimals round exactly as on Judge0's 64-bit Linux gcc.
    const fp = process.platform === "win32" ? ["-msse2", "-mfpmath=sse"] : [];
    execFileSync("gcc", ["-std=c11", "-O2", ...fp, "-D__USE_MINGW_ANSI_STDIO=1", src, "-o", exe, "-lm"], { stdio: "pipe" });
  } catch (e) {
    errors.push(`${f.slug}: solution does not compile\n${String((e as { stderr?: Buffer }).stderr)}`);
    continue;
  }

  let failed = false;
  const updated = raw.replace(/^```test (sample|hidden)\n([\s\S]*?)^```[ \t]*$/gm, (block, kind: string, body: string) => {
    if (/^---[ \t]*$/m.test(body) || failed) return block;
    const input = body.endsWith("\n") ? body : body + "\n";
    const run = spawnSync(exe, { input, encoding: "utf8", timeout: 10_000 });
    if (run.error || run.status !== 0) {
      errors.push(`${f.slug}: reference solution failed on input:\n${input}${run.error?.message ?? `exit code ${run.status}`}`);
      failed = true;
      return block;
    }
    filled++;
    const output = run.stdout.replace(/\r\n/g, "\n");
    return "```test " + kind + "\n" + input + "---\n" + (output.endsWith("\n") ? output : output + "\n") + "```";
  });
  if (!failed && updated !== raw) writeFileSync(f.path, updated);
}

rmSync(work, { recursive: true, force: true });
console.log(`Filled ${filled} expected outputs.`);
for (const e of errors) console.log("\n" + e);
process.exit(errors.length ? 1 : 0);
