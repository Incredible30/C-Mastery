import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, ButtonLink, Callout, Card, PageHeader, Progress, Ring } from "@/components/ui";
import { requireViewer } from "@/lib/auth/session";
import { getCourseOutline } from "@/lib/data/learning";
import { PLAN_LABEL } from "@/lib/plans";

type Params = { params: Promise<{ moduleSlug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { moduleSlug } = await params;
  return { title: moduleSlug.replace(/-/g, " ") };
}

export default async function ModulePage({ params }: Params) {
  const { moduleSlug } = await params;
  const viewer = await requireViewer(`/learn/${moduleSlug}`);
  const outline = await getCourseOutline(viewer.id, viewer.plan);
  const idx = outline?.modules.findIndex((m) => m.slug === moduleSlug) ?? -1;
  if (!outline || idx < 0) notFound();
  const m = outline.modules[idx], prev = outline.modules[idx - 1], next = outline.modules[idx + 1];
  const nextLesson = m.lessons.find((l) => !outline.completed.has(l.id) && (!m.locked || l.is_free_preview));
  const minutes = m.lessons.reduce((a, l) => a + l.estimated_minutes, 0);

  return (
    <div className="grid gap-5">
      <PageHeader
        crumbs={<><Link href="/learn" className="text-accent">Roadmap</Link> / Module {m.position}</>}
        title={`Module ${m.position}: ${m.title}`}
        description={m.summary}
        actions={<>{prev && <ButtonLink href={`/learn/${prev.slug}`} variant="ghost">← Module {prev.position}</ButtonLink>}{next && <ButtonLink href={`/learn/${next.slug}`} variant="ghost">Module {next.position} →</ButtonLink>}</>}
      />
      {m.locked && <Callout tone="amber">This module is part of the {PLAN_LABEL[m.required_plan]} plan. Lessons marked Preview are free to read. Paid plans arrive with checkout in a later release.</Callout>}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Card>
          <div className="mb-2 flex items-center justify-between"><h2 className="text-lg font-bold">Lessons</h2><span className="text-[13px] text-muted">{m.lessons.length} lessons · {minutes} min</span></div>
          <ol className="divide-y divide-border">
            {m.lessons.map((l, i) => {
              const done = outline.completed.has(l.id), open = !m.locked || l.is_free_preview;
              return (
                <li key={l.id}>
                  <Link href={`/learn/${m.slug}/${l.slug}`} className="flex items-center gap-3 py-3 hover:text-accent">
                    <span className={`grid h-8 w-8 flex-none place-items-center rounded-lg text-xs font-bold ${done ? "bg-good-soft text-good" : "bg-surface-2 text-muted"}`}>{done ? "✓" : i + 1}</span>
                    <span className="min-w-0 flex-1"><span className="block font-medium">{l.title}</span><span className="text-xs capitalize text-muted">{l.kind} · {l.estimated_minutes} min</span></span>
                    {done ? <Badge tone="good">Done</Badge> : !open ? <Badge tone="amber">Locked</Badge> : l.is_free_preview && m.locked ? <Badge tone="accent">Preview</Badge> : null}
                  </Link>
                </li>
              );
            })}
          </ol>
        </Card>
        <div className="grid content-start gap-4">
          <Card className="grid gap-4">
            <div className="flex items-center gap-4"><Ring value={m.progressPct} size={88} label={`${m.progressPct}%`} /><div><div className="text-xs font-semibold uppercase tracking-wider text-muted">Your progress</div><b>{m.done} of {m.lessons.length} lessons</b></div></div>
            {nextLesson && <ButtonLink href={`/learn/${m.slug}/${nextLesson.slug}`} variant="primary">{m.done ? "Continue module" : "Start module"}</ButtonLink>}
            <Progress value={m.progressPct} tone="good" label="Module progress" />
          </Card>
          {m.outcomes.length > 0 && (
            <Card><h3 className="mb-2 font-semibold">What you will be able to do</h3><ul className="grid gap-1.5">{m.outcomes.map((o) => <li key={o} className="flex gap-2"><span className="text-good">✓</span>{o}</li>)}</ul></Card>
          )}
        </div>
      </div>
    </div>
  );
}
