/**
 * Loads lesson content from supabase/content/*.md into the lesson_contents table.
 *   npm run content:sync            write to the database in .env.local
 *   npm run content:sync -- --dry-run   show what would change, write nothing
 * Uses the service role key, so run it only on a trusted machine.
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { moduleSlugFromFile, parseModuleFile } from "../src/lib/content-parser.ts";

const root = process.cwd();
const dryRun = process.argv.includes("--dry-run");

function loadEnv(): Record<string, string> {
  const env: Record<string, string> = { ...process.env } as Record<string, string>;
  const file = join(root, ".env.local");
  if (existsSync(file)) {
    for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
      const m = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
      if (m && m[2] && !env[m[1]]) env[m[1]] = m[2].trim();
    }
  }
  return env;
}

const env = loadEnv();
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}
const headers = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${url}/rest/v1/${path}`, { headers });
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status} ${await res.text()}`);
  return res.json() as Promise<T>;
}

const contentDir = join(root, "supabase", "content");
const parsed = readdirSync(contentDir).sort().flatMap((file) => {
  const moduleSlug = moduleSlugFromFile(file);
  if (!moduleSlug) return [];
  return parseModuleFile(moduleSlug, readFileSync(join(contentDir, file), "utf8"));
});

const modules = await get<{ id: string; slug: string }[]>("modules?select=id,slug");
const lessons = await get<{ id: string; slug: string; module_id: string }[]>("lessons?select=id,slug,module_id");
const moduleSlugById = new Map(modules.map((m) => [m.id, m.slug]));
const lessonIdByKey = new Map(lessons.map((l) => [`${moduleSlugById.get(l.module_id)}/${l.slug}`, l.id]));

const rows: { lesson_id: string; body_md: string }[] = [];
const unknown: string[] = [];
for (const p of parsed) {
  const id = lessonIdByKey.get(`${p.moduleSlug}/${p.lessonSlug}`);
  if (id) rows.push({ lesson_id: id, body_md: p.body });
  else unknown.push(`${p.moduleSlug}/${p.lessonSlug}`);
}
const covered = new Set(rows.map((r) => r.lesson_id));
const withoutContent = [...lessonIdByKey].filter(([, id]) => !covered.has(id)).map(([k]) => k);

console.log(`Content files: ${parsed.length} lessons. Matched in database: ${rows.length}.`);
if (unknown.length) console.warn(`Not in the database (create these lessons first): ${unknown.join(", ")}`);
if (withoutContent.length) console.warn(`Database lessons with no content file: ${withoutContent.join(", ")}`);

if (dryRun) {
  console.log("Dry run: nothing written.");
} else if (rows.length) {
  const res = await fetch(`${url}/rest/v1/lesson_contents?on_conflict=lesson_id`, {
    method: "POST",
    headers: { ...headers, Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(rows),
  });
  if (!res.ok) {
    console.error(`Upload failed: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  console.log(`Saved ${rows.length} lessons.`);
}
