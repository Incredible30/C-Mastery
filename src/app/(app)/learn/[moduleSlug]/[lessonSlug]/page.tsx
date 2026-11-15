import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge, ButtonLink, Callout, Card, Progress } from "@/components/ui";
import { CompleteButton } from "./complete-button";
import { requireViewer } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import { getCourseOutline } from "@/lib/data/learning";
import { PLAN_LABEL } from "@/lib/plans";

type Params = { params: Promise<{ moduleSlug: string; lessonSlug: string }> };

export default async function LessonPage({ params }: Params) {
  const { moduleSlug, lessonSlug } = await params;
  const viewer = await requireViewer(`/learn/${moduleSlug}/${lessonSlug}`);
  const outline = await getCourseOutline(viewer.id, viewer.plan);
  const m = outline?.modules.find((x) => x.slug === moduleSlug);
  const lesson = m?.lessons.find((l) => l.slug === lessonSlug);
  if (!outline || !m || !lesson) notFound();

  // RLS returns no row when the viewer's plan doesn't include this lesson.
  const supabase = await createClient();
  const { data: content } = await supabase.from("lesson_contents").select("body_md").eq("lesson_id", lesson.id).maybeSingle();

  const flat = outline.modules.flatMap((mod) => mod.lessons.map((l) => ({ mod, l })));
  const i = flat.findIndex((x) => x.l.id === lesson.id);
  const prev = flat[i - 1], next = flat[i + 1];
  const done = outline.completed.has(lesson.id);
  const pos = m.lessons.indexOf(lesson) + 1;

  return (
    <div className="grid gap-5">
      <div>
        <div className="mb-1.5 text-[13px] text-muted"><Link href="/learn" className="text-accent">Roadmap</Link> / <Link href={`/learn/${m.slug}`} className="text-accent">Module {m.position}: {m.title}</Link> / Lesson {pos}</div>
        <h1 className="text-[1.7rem] font-bold leading-tight">{lesson.title}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-[13px] text-muted">
          <Badge tone="accent">Lesson {pos} of {m.lessons.length}</Badge><span className="capitalize">{lesson.kind}</span><span>· {lesson.estimated_minutes} min</span>
          {done && <Badge tone="good">Completed</Badge>}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Card className="grid gap-5 p-6">
          {content ? (
            <article className="prose-lesson"><ReactMarkdown remarkPlugins={[remarkGfm]}>{content.body_md}</ReactMarkdown></article>
          ) : (
            <Callout tone="amber">
              <b>This lesson is part of the {PLAN_LABEL[m.required_plan]} plan.</b> Upgrade to read it. Checkout arrives in a later release; until then an admin can change your plan.
            </Callout>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            {prev ? <ButtonLink href={`/learn/${prev.mod.slug}/${prev.l.slug}`} variant="ghost">← Previous</ButtonLink> : <span />}
            <div className="flex flex-wrap items-center gap-2">
              {content && !done && <CompleteButton lessonId={lesson.id} />}
              {next && <ButtonLink href={`/learn/${next.mod.slug}/${next.l.slug}`} variant={done ? "primary" : "secondary"}>Next lesson →</ButtonLink>}
            </div>
          </div>
        </Card>

        <Card className="h-fit">
          <div className="mb-2 flex justify-between"><h3 className="font-semibold">Module {m.position} lessons</h3><span className="text-[13px] text-muted">{m.progressPct}%</span></div>
          <Progress value={m.progressPct} />
          <ol className="mt-3 grid gap-0.5">
            {m.lessons.map((l) => (
              <li key={l.id}>
                <Link href={`/learn/${m.slug}/${l.slug}`} aria-current={l.id === lesson.id ? "page" : undefined}
                  className={`flex gap-2 rounded-md px-2 py-1.5 text-[13.5px] hover:bg-surface-2 ${l.id === lesson.id ? "bg-accent-soft font-semibold text-accent-strong" : ""}`}>
                  <span className={outline.completed.has(l.id) ? "text-good" : "text-faint"}>{outline.completed.has(l.id) ? "✓" : "○"}</span>{l.title}
                </Link>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  );
}
