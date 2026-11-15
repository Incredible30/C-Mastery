import type { Metadata } from "next";
import Link from "next/link";
import { Badge, Card, EmptyState, PageHeader, Progress } from "@/components/ui";
import { requireViewer } from "@/lib/auth/session";
import { getCourseOutline } from "@/lib/data/learning";
import { PLAN_LABEL } from "@/lib/plans";
import { percent } from "@/lib/progress";

export const metadata: Metadata = { title: "Learning Roadmap" };

const levelTone = { beginner: "good", intermediate: "warn", advanced: "bad" } as const;

export default async function RoadmapPage() {
  const viewer = await requireViewer("/learn");
  const outline = await getCourseOutline(viewer.id, viewer.plan);
  if (!outline) return <Card><EmptyState title="No course published yet">Check back soon.</EmptyState></Card>;

  return (
    <div className="grid gap-5">
      <PageHeader title={outline.course.title} description={outline.course.description}
        actions={<Card className="min-w-60 px-4 py-3"><div className="mb-2 flex justify-between text-[13px]"><span className="text-muted">Overall</span><b className="tabular-nums">{outline.doneLessons}/{outline.totalLessons} lessons</b></div><Progress value={percent(outline.doneLessons, outline.totalLessons)} /></Card>} />
      <div className="grid gap-4 md:grid-cols-2">
        {outline.modules.map((m) => {
          const state = m.progressPct === 100 ? "Completed" : m.done > 0 ? "In progress" : "Not started";
          return (
            <Link key={m.id} href={`/learn/${m.slug}`} className="group">
              <Card className={`grid h-full gap-3 transition-colors group-hover:border-accent ${m.done > 0 && m.progressPct < 100 ? "border-accent" : ""}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-surface-2 font-mono text-sm font-bold">{String(m.position).padStart(2, "0")}</span>
                    <div><h2 className="font-bold">{m.title}</h2><span className="text-xs text-muted">{m.lessons.length} lessons · {m.estimated_hours} hours</span></div>
                  </div>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    <Badge tone={levelTone[m.level]}>{m.level}</Badge>
                    {m.locked && <Badge tone="amber">{PLAN_LABEL[m.required_plan]}</Badge>}
                  </div>
                </div>
                <p className="text-[13.5px] text-muted">{m.summary}</p>
                <div className="mt-auto grid gap-1.5"><div className="flex justify-between text-xs text-muted"><span>{state}</span><span className="tabular-nums">{m.done}/{m.lessons.length}</span></div><Progress value={m.progressPct} tone={m.progressPct === 100 ? "good" : "accent"} /></div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
