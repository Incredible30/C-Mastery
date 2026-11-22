/**
 * Loads practice problems from supabase/problems/*.md into the problems and test_cases tables.
 *   npm run problems:sync               write to the database in .env.local
 *   npm run problems:sync -- --dry-run  show what would change
 * Reference solutions are never uploaded. Run `npm run problems:check` first.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parseProblemFile } from "../src/lib/problem-parser.ts";
import { listProblemFiles } from "./problem-files.ts";

const root = process.cwd();
const dryRun = process.argv.includes("--dry-run");

const env: Record<string, string> = {};
const envFile = join(root, ".env.local");
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
    if (m && m[2]) env[m[1]] = m[2].trim();
  }
}
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}
const headers = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };

async function api(method: string, path: string, body?: unknown, prefer?: string) {
  const res = await fetch(`${url}/rest/v1/${path}`, {
    method, headers: { ...headers, ...(prefer ? { Prefer: prefer } : {}) }, body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} failed: ${res.status} ${text}`);
  return text ? JSON.parse(text) : null;   // writes with return=minimal reply with an empty body
}

const problems = listProblemFiles().map((f) => parseProblemFile(f.slug, readFileSync(f.path, "utf8"), { defaultModule: f.folder }));

const modules: { id: string; slug: string }[] = await api("GET", "modules?select=id,slug");
const moduleId = new Map(modules.map((m) => [m.slug, m.id]));

console.log(`${problems.length} problems, ${problems.reduce((a, p) => a + p.tests.length, 0)} tests.`);
if (dryRun) {
  for (const p of problems) console.log(`  ${p.slug} (${p.difficulty}, ${p.plan}, ${p.tests.length} tests)`);
  console.log("Dry run: nothing written.");
  process.exit(0);
}

const rows = problems.map((p) => ({
  slug: p.slug, title: p.title, difficulty: p.difficulty, topic: p.topic,
  module_id: p.module ? moduleId.get(p.module) ?? null : null,
  statement_md: p.statement, starter_code: p.starter, hints: p.hints, xp: p.xp,
  time_limit_ms: p.timeLimitMs, memory_kb: p.memoryKb, required_plan: p.plan, status: "published",
}));
const idBySlug = new Map<string, string>();
for (let i = 0; i < rows.length; i += 100) {
  const saved: { id: string; slug: string }[] = await api("POST", "problems?on_conflict=slug&select=id,slug", rows.slice(i, i + 100),
    "resolution=merge-duplicates,return=representation");
  for (const s of saved) idBySlug.set(s.slug, s.id);
}

let done = 0;
for (const p of problems) {
  const id = idBySlug.get(p.slug)!;
  await api("DELETE", `test_cases?problem_id=eq.${id}`);
  await api("POST", "test_cases", p.tests.map((t, i) => ({
    problem_id: id, input: t.input, expected_output: t.output, is_hidden: t.hidden, position: i + 1,
  })), "return=minimal");
  if (++done % 50 === 0) console.log(`  ${done}/${problems.length} problems saved`);
}
console.log(`Saved ${problems.length} problems and their tests.`);
