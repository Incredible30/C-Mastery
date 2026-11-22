/**
 * Compiles every complete C program (a ```c block containing main) in supabase/content/*.md.
 *   npm run content:check
 * Needs gcc on the PATH. Snippets without main are skipped.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { moduleSlugFromFile, parseModuleFile } from "../src/lib/content-parser.ts";

const only = process.argv[2]; // optional: a module file prefix such as "03"
const dir = join(process.cwd(), "supabase", "content");
const work = mkdtempSync(join(tmpdir(), "cm-"));
let checked = 0;
const failures: string[] = [];

for (const file of readdirSync(dir).sort()) {
  const moduleSlug = moduleSlugFromFile(file);
  if (!moduleSlug || (only && !file.startsWith(only))) continue;
  for (const lesson of parseModuleFile(moduleSlug, readFileSync(join(dir, file), "utf8"))) {
    const blocks = [...lesson.body.matchAll(/^```c\n([\s\S]*?)^```/gm)].map((m) => m[1]);
    blocks.forEach((code, i) => {
      if (!/\bint\s+main\s*\(/.test(code)) return;
      const src = join(work, `${lesson.lessonSlug}-${i}.c`);
      writeFileSync(src, code);
      checked++;
      try {
        execFileSync("gcc", ["-fsyntax-only", "-std=c11", "-Wall", "-Wextra", "-Werror", "-D__USE_MINGW_ANSI_STDIO=1", src], { stdio: "pipe" });
      } catch (e) {
        const err = e as { stderr?: Buffer };
        failures.push(`${moduleSlug}/${lesson.lessonSlug} block ${i + 1}:\n${err.stderr?.toString().replaceAll(work, "").trim()}`);
      }
    });
  }
}

rmSync(work, { recursive: true, force: true });
console.log(`Compiled ${checked} programs, ${failures.length} failed.`);
for (const f of failures) console.log("\n" + f);
process.exit(failures.length ? 1 : 0);
