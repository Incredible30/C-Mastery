import type { Metadata } from "next";
import Link from "next/link";
import { Badge, Card, EmptyState, PageHeader, Progress } from "@/components/ui";
import { requireViewer } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import { canAccessPlan, PLAN_LABEL } from "@/lib/plans";
import { percent } from "@/lib/progress";
import { sortProblems } from "@/lib/practice-order";
import type { ProblemLevel } from "@/lib/database.types";

export const metadata: Metadata = { title: "Coding Practice" };

const LEVEL_TONE = { easy: "good", medium: "warn", hard: "bad" } as const;
const LEVELS: ProblemLevel[] = ["easy", "medium", "hard"];

type Search = { difficulty?: string; topic?: string; status?: string; module?: string };

export default async function PracticePage({ searchParams }: { searchParams: Promise<Search> }) {
  const viewer = await requireViewer("/practice");
  const sp = await searchParams;
  const supabase = await createClient();
  const [{ data: problems }, { data: subs }, { data: modules }] = await Promise.all([
    supabase.from("problems").select("id, slug, title, difficulty, topic, xp, required_plan, module_id").eq("status", "published"),
    supabase.from("submissions").select("problem_id, status").eq("user_id", viewer.id),
    supabase.from("modules").select("id, slug, title, position").eq("status", "published").order("position"),
  ]);
  const modulePos = new Map((modules ?? []).map((m) => [m.id, m.position]));
  const all = sortProblems(problems ?? [], modulePos);
  const solved = new Set((subs ?? []).filter((s) => s.status === "accepted").map((s) => s.problem_id));
  const attempted = new Set((subs ?? []).map((s) => s.problem_id));
  const topics = [...new Set(all.map((p) => p.topic))].sort();
  const filtering = !!(sp.difficulty || sp.topic || sp.status || sp.module);

  const shown = all.filter((p) =>
    (!sp.difficulty || p.difficulty === sp.difficulty) &&
    (!sp.topic || p.topic === sp.topic) &&
    (!sp.module || (modules ?? []).find((m) => m.id === p.module_id)?.slug === sp.module) &&
    (!sp.status || (sp.status === "solved" ? solved.has(p.id) : sp.status === "todo" ? !solved.has(p.id) : true)));

  const groups = [
    ...(modules ?? []).map((m) => ({ key: m.id, title: `Module ${m.position}: ${m.title}`, slug: m.slug, items: all.filter((p) => p.module_id === m.id) })),
    { key: "other", title: "More problems", slug: "", items: all.filter((p) => !p.module_id || !modulePos.has(p.module_id)) },
  ].filter((g) => g.items.length > 0);
  const firstOpen = groups.find((g) => g.items.some((p) => !solved.has(p.id)))?.key;

  const href = (patch: Partial<Search>) => {
    const q = new URLSearchParams(Object.entries({ ...sp, ...patch }).filter(([, v]) => v) as [string, string][]);
    const s = q.toString();
    return s ? `/practice?${s}` : "/practice";
  };
  const chip = (active: boolean) => `rounded-full border px-3 py-1 text-[13px] font-medium ${active ? "border-accent bg-accent-soft text-accent-strong" : "border-border bg-surface text-muted hover:text-fg"}`;

  return (
    <div className="grid gap-5">
      <PageHeader title="Coding Practice" description={`${all.length} problems across every module, from easy to hard. Run your code on the examples, then submit to be judged against hidden tests. Every accepted solution earns XP.`} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="grid gap-1.5"><span className="text-[11px] font-semibold uppercase tracking-wider text-muted">Solved</span>
          <div className="font-display text-3xl font-bold tabular-nums">{solved.size}<span className="ml-1 font-sans text-sm text-muted">/ {all.length}</span></div>
          <Progress value={percent(solved.size, all.length)} tone="good" label="Problems solved" /></Card>
        {LEVELS.map((lvl) => {
          const ofLevel = all.filter((p) => p.difficulty === lvl);
          const done = ofLevel.filter((p) => solved.has(p.id)).length;
          return (
            <Card key={lvl} className="grid gap-1.5"><div className="flex items-center justify-between"><span className="text-[11px] font-semibold uppercase tracking-wider text-muted">{lvl}</span><Badge tone={LEVEL_TONE[lvl]}>{lvl}</Badge></div>
              <div className="font-display text-3xl font-bold tabular-nums">{done}<span className="ml-1 font-sans text-sm text-muted">/ {ofLevel.length}</span></div>
              <Progress value={percent(done, ofLevel.length)} label={`${lvl} solved`} /></Card>
          );
        })}
      </div>

      <Card className="grid gap-2.5" aria-label="Filters">
        <div className="flex flex-wrap items-center gap-2">
          <Link href={href({ difficulty: undefined })} className={chip(!sp.difficulty)}>All levels</Link>
          {LEVELS.map((l) => <Link key={l} href={href({ difficulty: l })} className={`${chip(sp.difficulty === l)} capitalize`}>{l}</Link>)}
          <span className="mx-1 h-5 w-px bg-border" />
          <Link href={href({ status: undefined })} className={chip(!sp.status)}>Any status</Link>
          <Link href={href({ status: "todo" })} className={chip(sp.status === "todo")}>Unsolved</Link>
          <Link href={href({ status: "solved" })} className={chip(sp.status === "solved")}>Solved</Link>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href={href({ module: undefined })} className={chip(!sp.module)}>All modules</Link>
          {(modules ?? []).map((m) => <Link key={m.id} href={href({ module: m.slug })} className={chip(sp.module === m.slug)}>{m.position}. {m.title}</Link>)}
        </div>
        {topics.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            <Link href={href({ topic: undefined })} className={chip(!sp.topic)}>All topics</Link>
            {topics.map((t) => <Link key={t} href={href({ topic: t })} className={chip(sp.topic === t)}>{t}</Link>)}
          </div>
        )}
      </Card>

      {all.length === 0 && <Card><EmptyState title="No problems published yet">Load problems with npm run problems:sync (see the instruction book).</EmptyState></Card>}
      {all.length > 0 && shown.length === 0 && <Card><EmptyState title="No problems match these filters"><Link href="/practice" className="text-accent">Clear filters</Link></EmptyState></Card>}

      {groups.map((g) => {
        const items = g.items.filter((p) => shown.includes(p));
        if (items.length === 0) return null;
        const done = g.items.filter((p) => solved.has(p.id)).length;
        const counts = LEVELS.map((l) => g.items.filter((p) => p.difficulty === l).length);
        return (
          <details key={g.key} open={filtering || g.key === firstOpen} className="group rounded-xl border border-border bg-surface">
            <summary className="flex cursor-pointer flex-wrap items-center gap-3 px-5 py-4">
              <span className="text-faint transition-transform group-open:rotate-90" aria-hidden="true">▸</span>
              <h2 className="text-lg font-bold">{g.title}</h2>
              <span className="text-[13px] text-muted">{g.items.length} problems</span>
              <span className="flex gap-1.5"><Badge tone="good">{counts[0]} easy</Badge><Badge tone="warn">{counts[1]} medium</Badge><Badge tone="bad">{counts[2]} hard</Badge></span>
              <span className="ml-auto flex min-w-40 items-center gap-2 text-[13px] text-muted"><span className="tabular-nums">{done}/{g.items.length}</span><span className="flex-1"><Progress value={percent(done, g.items.length)} tone="good" label={`${g.title} solved`} /></span></span>
            </summary>
            <div className="overflow-x-auto border-t border-border px-5 pb-3">
              <table className="w-full text-[14px]">
                <thead><tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted">
                  <th className="w-10 py-2 pr-2"><span className="sr-only">Status</span></th><th className="py-2 pr-3">Problem</th><th className="py-2 pr-3">Topic</th><th className="py-2 pr-3">Difficulty</th><th className="py-2 text-right">XP</th></tr></thead>
                <tbody>
                  {items.map((p) => {
                    const locked = !canAccessPlan(viewer.plan, p.required_plan);
                    const state = solved.has(p.id) ? "solved" : attempted.has(p.id) ? "attempted" : "new";
                    return (
                      <tr key={p.id} className="border-b border-border last:border-0 hover:bg-surface-2">
                        <td className="py-2.5 pr-2" title={state}>
                          <span className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${state === "solved" ? "bg-good-soft text-good" : state === "attempted" ? "bg-warn-soft text-warn" : "bg-surface-2 text-faint"}`}>
                            {state === "solved" ? "✓" : state === "attempted" ? "…" : "○"}</span>
                        </td>
                        <td className="py-2.5 pr-3"><Link href={`/practice/${p.slug}`} className="font-medium hover:text-accent">{p.title}</Link>
                          {locked && <span className="ml-2"><Badge tone="amber">{PLAN_LABEL[p.required_plan]}</Badge></span>}</td>
                        <td className="py-2.5 pr-3 text-muted">{p.topic}</td>
                        <td className="py-2.5 pr-3"><Badge tone={LEVEL_TONE[p.difficulty]}>{p.difficulty}</Badge></td>
                        <td className="py-2.5 text-right font-semibold tabular-nums text-amber">+{p.xp}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </details>
        );
      })}
    </div>
  );
}
