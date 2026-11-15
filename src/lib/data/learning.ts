import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Course, Lesson, Module, PlanTier } from "@/lib/database.types";
import { canAccessPlan } from "@/lib/plans";
import { addDays, percent, todayIn, type DayActivity } from "@/lib/progress";

export type ModuleWithLessons = Module & { lessons: Lesson[]; done: number; progressPct: number; locked: boolean };
export type CourseOutline = { course: Course; modules: ModuleWithLessons[]; completed: Set<string>; totalLessons: number; doneLessons: number };

/** The main published course with its modules, lessons and the viewer's completion state. RLS filters drafts. */
export async function getCourseOutline(userId: string, plan: PlanTier): Promise<CourseOutline | null> {
  const supabase = await createClient();
  const { data: course } = await supabase.from("courses").select("*").eq("status", "published")
    .order("position").limit(1).maybeSingle();
  if (!course) return null;

  const { data: modules = [] } = await supabase.from("modules").select("*")
    .eq("course_id", course.id).eq("status", "published").order("position");
  const moduleIds = (modules ?? []).map((m) => m.id);
  const [{ data: lessons }, { data: progress }] = await Promise.all([
    moduleIds.length
      ? supabase.from("lessons").select("*").in("module_id", moduleIds).eq("status", "published").order("position")
      : Promise.resolve({ data: [] as Lesson[] }),
    supabase.from("lesson_progress").select("lesson_id").eq("user_id", userId),
  ]);

  const completed = new Set((progress ?? []).map((p) => p.lesson_id));
  const withLessons = (modules ?? []).map((m) => {
    const ls = (lessons ?? []).filter((l) => l.module_id === m.id);
    const done = ls.filter((l) => completed.has(l.id)).length;
    return { ...m, lessons: ls, done, progressPct: percent(done, ls.length), locked: !canAccessPlan(plan, m.required_plan) };
  });
  const totalLessons = withLessons.reduce((a, m) => a + m.lessons.length, 0);
  const doneLessons = withLessons.reduce((a, m) => a + m.done, 0);
  return { course, modules: withLessons, completed, totalLessons, doneLessons };
}

/** First unfinished lesson the viewer can open, in course order. */
export function nextLesson(outline: CourseOutline) {
  for (const m of outline.modules) {
    for (const l of m.lessons) {
      if (!outline.completed.has(l.id) && (!m.locked || l.is_free_preview)) return { module: m, lesson: l };
    }
  }
  return null;
}

export async function getActivity(userId: string, timezone: string, days = 400): Promise<{ today: string; rows: DayActivity[] }> {
  const supabase = await createClient();
  const today = todayIn(timezone);
  const { data } = await supabase.from("daily_activity").select("day, minutes, lessons_done, problems_solved")
    .eq("user_id", userId).gte("day", addDays(today, -days)).order("day");
  return { today, rows: data ?? [] };
}

export type RecentItem = { id: string; title: string; meta: string; at: string; href: string };

export async function getRecentActivity(userId: string, outline: CourseOutline | null): Promise<RecentItem[]> {
  if (!outline) return [];
  const supabase = await createClient();
  const { data } = await supabase.from("lesson_progress").select("lesson_id, completed_at")
    .eq("user_id", userId).order("completed_at", { ascending: false }).limit(6);
  const lessonIndex = new Map(outline.modules.flatMap((m) => m.lessons.map((l) => [l.id, { m, l }] as const)));
  return (data ?? []).flatMap((p) => {
    const hit = lessonIndex.get(p.lesson_id);
    if (!hit) return [];
    return [{ id: p.lesson_id, title: `Completed “${hit.l.title}”`, meta: `Module ${hit.m.position} · ${hit.m.title}`,
      at: p.completed_at, href: `/learn/${hit.m.slug}/${hit.l.slug}` }];
  });
}
