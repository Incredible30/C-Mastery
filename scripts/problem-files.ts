/** Lists problem files: supabase/problems/<module-slug>/NNN-<problem-slug>.md */
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { problemSlugFromFile } from "../src/lib/problem-parser.ts";

export type ProblemFile = { path: string; slug: string; folder: string };

export function listProblemFiles(root = join(process.cwd(), "supabase", "problems")): ProblemFile[] {
  const out: ProblemFile[] = [];
  for (const folder of readdirSync(root).sort()) {
    const dir = join(root, folder);
    if (!statSync(dir).isDirectory()) continue;
    for (const file of readdirSync(dir).sort()) {
      const slug = problemSlugFromFile(file);
      if (slug) out.push({ path: join(dir, file), slug, folder });
    }
  }
  return out;
}
