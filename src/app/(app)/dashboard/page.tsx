import type { Metadata } from "next";
import Link from "next/link";
import { Badge, ButtonLink, Callout, Card, EmptyState, Kicker, PageHeader, Progress, Ring } from "@/components/ui";
import { WeekChart } from "@/components/week-chart";
import { StudyLog } from "./study-log";
import { requireViewer } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import { getActivity, getCourseOutline, getRecentActivity, nextLesson } from "@/lib/data/learning";
import { currentStreak, lastNDays, levelFromXp, longestStreak, percent, XP_PER_LESSON } from "@/lib/progress";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const viewer = await requireViewer("/dashboard");
  const supabase = await createClient();
  const [outline, activity, { data: accepted }] = await Promise.all([
    getCourseOutline(viewer.id, viewer.plan),
    getActivity(viewer.id, viewer.profile.timezone),
    supabase.from("submissions").select("problem_id").eq("user_id", viewer.id).eq("status", "accepted"),
  ]);
  const solvedIds = [...new Set((accepted ?? []).map((s) => s.problem_id))];
  const { data: solvedProblems } = solvedIds.length
    ? await supabase.from("problems").select("xp").in("id", solvedIds)
    : { data: [] as { xp: number }[] };

  const recent = await getRecentActivity(viewer.id, outline);
  const week = lastNDays(activity.rows, activity.today, 7);
  const todayMinutes = week[week.length - 1].minutes;
  const goal = viewer.profile.daily_goal_minutes;
  const streak = currentStreak(activity.rows, activity.today);
  const xp = (outline?.doneLessons ?? 0) * XP_PER_LESSON + (solvedProblems ?? []).reduce((a, p) => a + p.xp, 0);
  const level = levelFromXp(xp);
  const next = outline ? nextLesson(outline) : null;
  const weekMinutes = week.reduce((a, d) => a + d.minutes, 0);
  const firstName = (viewer.profile.full_name || "there").split(" ")[0];

  return (
    <div className="grid gap-5">
      <PageHeader
        title={`Welcome back, ${firstName}`}
        description={todayMinutes >= goal ? "Daily goal reached. Your streak is safe for today." : `${goal - todayMinutes} minutes to today's goal.${streak ? ` Keep your ${streak}-day streak going.` : ""}`}
        actions={next && <ButtonLink href={`/learn/${next.module.slug}/${next.lesson.slug}`} variant="primary">Resume learning</ButtonLink>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="grid gap-1.5">
          <Kicker>Learning streak</Kicker>
          <div className="font-display text-3xl font-bold tabular-nums">{streak}<span className="ml-1 font-sans text-sm font-medium text-muted">{streak === 1 ? "day" : "days"}</span></div>
          <span className="text-[13px] text-muted">Longest: {longestStreak(activity.rows)} days</span>
        </Card>
        <Card className="grid gap-1.5">
          <Kicker>Problems solved</Kicker>
          <div className="font-display text-3xl font-bold tabular-nums">{solvedIds.length}</div>
          <span className="text-[13px] text-muted">Practice problems arrive in the next release</span>
        </Card>
        <Card className="grid gap-1.5">
          <Kicker>Current level</Kicker>
          <div className="font-display text-3xl font-bold">Level {level.level}</div>
          <div className="flex justify-between text-xs text-muted"><span>{level.name}</span><span className="tabular-nums">{level.xp.toLocaleString("en-IN")} / {level.nextLevelAt.toLocaleString("en-IN")} XP</span></div>
          <Progress value={level.progressPct} label="Progress to next level" />
        </Card>
        <Card className="flex items-center gap-4">
          <Ring value={percent(todayMinutes, goal)} size={88} label={`${todayMinutes}m`} sub={`of ${goal}m`} />
          <div className="grid gap-2"><Kicker>Daily goal</Kicker><StudyLog /></div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Card>
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-lg font-bold">Weekly progress</h2>
            <span className="text-[13px] text-muted">{weekMinutes} min this week · {Math.round(weekMinutes / 7)} min a day on average</span>
          </div>
          <WeekChart days={week} />
        </Card>

        <Card className="grid content-start gap-3">
          <Kicker>Recommended next lesson</Kicker>
          {next ? (
            <>
              <h2 className="text-lg font-bold">{next.lesson.title}</h2>
              <p className="text-[13.5px] text-muted">Module {next.module.position}: {next.module.title} · {next.lesson.estimated_minutes} min</p>
              <div className="grid gap-1.5"><div className="flex justify-between text-xs text-muted"><span>Module progress</span><span>{next.module.progressPct}%</span></div><Progress value={next.module.progressPct} /></div>
              <div className="flex gap-2"><ButtonLink href={`/learn/${next.module.slug}/${next.lesson.slug}`} variant="primary">Start lesson</ButtonLink><ButtonLink href={`/learn/${next.module.slug}`} variant="ghost">View module</ButtonLink></div>
            </>
          ) : outline ? (
            <Callout tone="good">You have finished every lesson available on your plan.</Callout>
          ) : (
            <EmptyState title="No course published yet">An instructor needs to publish the course first.</EmptyState>
          )}
          {outline && (
            <div className="mt-2 grid gap-1.5 border-t border-border pt-3">
              <div className="flex justify-between text-xs text-muted"><span>Course progress</span><span className="tabular-nums">{outline.doneLessons}/{outline.totalLessons} lessons</span></div>
              <Progress value={percent(outline.doneLessons, outline.totalLessons)} tone="good" />
            </div>
          )}
        </Card>
      </div>

      <Card>
        <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold">Recent activity</h2><Link href="/learn" className="text-[13px] font-medium text-accent">Open roadmap</Link></div>
        {recent.length ? (
          <ul className="divide-y divide-border">
            {recent.map((r) => (
              <li key={r.id} className="flex items-center gap-3 py-2.5">
                <Badge tone="good">Done</Badge>
                <Link href={r.href} className="min-w-0 flex-1"><span className="block truncate font-medium">{r.title}</span><span className="text-xs text-muted">{r.meta}</span></Link>
                <time className="whitespace-nowrap text-xs text-faint" dateTime={r.at}>{new Date(r.at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</time>
              </li>
            ))}
          </ul>
        ) : <EmptyState title="Nothing yet">Complete your first lesson and it will show up here.</EmptyState>}
      </Card>
    </div>
  );
}
