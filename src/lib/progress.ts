/** Learning-progress calculations. Pure functions: dates are "YYYY-MM-DD" strings in the learner's time zone. */

export type DayActivity = { day: string; minutes: number; lessons_done?: number; problems_solved?: number };

export function todayIn(timeZone: string, now: Date = new Date()): string {
  // en-CA formats as YYYY-MM-DD.
  try {
    return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  } catch {
    return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
  }
}

export function addDays(day: string, delta: number): string {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
}

const isActive = (a: DayActivity) => a.minutes > 0 || (a.lessons_done ?? 0) > 0 || (a.problems_solved ?? 0) > 0;

/**
 * Consecutive active days ending today. If today has no activity yet, the streak
 * still counts up to yesterday so it is not shown as broken before the day is over.
 */
export function currentStreak(activity: DayActivity[], today: string): number {
  const active = new Set(activity.filter(isActive).map((a) => a.day));
  let day = active.has(today) ? today : addDays(today, -1);
  let streak = 0;
  while (active.has(day)) { streak++; day = addDays(day, -1); }
  return streak;
}

export function longestStreak(activity: DayActivity[]): number {
  const days = [...new Set(activity.filter(isActive).map((a) => a.day))].sort();
  let best = 0, run = 0, prev: string | null = null;
  for (const d of days) {
    run = prev && addDays(prev, 1) === d ? run + 1 : 1;
    best = Math.max(best, run);
    prev = d;
  }
  return best;
}

/** The last `n` days ending today, oldest first, with zeros for days without activity. */
export function lastNDays(activity: DayActivity[], today: string, n = 7): Required<DayActivity>[] {
  const byDay = new Map(activity.map((a) => [a.day, a]));
  return Array.from({ length: n }, (_, i) => {
    const day = addDays(today, i - (n - 1));
    const a = byDay.get(day);
    return { day, minutes: a?.minutes ?? 0, lessons_done: a?.lessons_done ?? 0, problems_solved: a?.problems_solved ?? 0 };
  });
}

export const XP_PER_LESSON = 25;
const LEVEL_NAMES = ["Hello World", "Syntax Scout", "Loop Learner", "Function Finder", "Array Ace", "String Slinger",
  "Pointer Pathfinder", "Struct Smith", "Heap Handler", "Systems Sage"];

/** Level n needs 300·n·(n−1)/2 total XP: 0, 300, 900, 1800, … */
export function xpForLevel(level: number): number {
  return (300 * level * (level - 1)) / 2;
}

export function levelFromXp(xp: number) {
  const safe = Math.max(0, Math.floor(xp));
  let level = 1;
  while (xpForLevel(level + 1) <= safe) level++;
  const floor = xpForLevel(level), next = xpForLevel(level + 1);
  return {
    level,
    name: LEVEL_NAMES[Math.min(level, LEVEL_NAMES.length) - 1],
    xp: safe,
    levelStart: floor,
    nextLevelAt: next,
    progressPct: Math.round(((safe - floor) / (next - floor)) * 100),
  };
}

export function percent(done: number, total: number): number {
  return total <= 0 ? 0 : Math.round((done / total) * 100);
}
