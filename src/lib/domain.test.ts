import { describe, expect, it } from "vitest";
import { canAccessPlan, formatInr, AI_DAILY_LIMIT } from "./plans";
import { addDays, currentStreak, lastNDays, levelFromXp, longestStreak, percent, todayIn, xpForLevel } from "./progress";

describe("plan access", () => {
  it("follows plan rank", () => {
    expect(canAccessPlan("free", "free")).toBe(true);
    expect(canAccessPlan("free", "pro")).toBe(false);
    expect(canAccessPlan("pro", "pro")).toBe(true);
    expect(canAccessPlan("premium", "pro")).toBe(true);
    expect(canAccessPlan("pro", "premium")).toBe(false);
  });
  it("opens free previews to everyone", () => {
    expect(canAccessPlan("free", "premium", true)).toBe(true);
  });
  it("formats rupees", () => {
    expect(formatInr(49_900)).toBe("₹499");
    expect(formatInr(449_900)).toBe("₹4,499");
  });
  it("matches database AI quotas", () => {
    expect(AI_DAILY_LIMIT).toEqual({ free: 10, pro: 200, premium: 500 });
  });
});

describe("dates", () => {
  it("adds days across months and years", () => {
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
  });
  it("uses the learner's time zone", () => {
    const now = new Date("2026-11-15T20:00:00Z"); // 01:30 on the 16th in India
    expect(todayIn("Asia/Kolkata", now)).toBe("2026-11-16");
    expect(todayIn("UTC", now)).toBe("2026-11-15");
    expect(todayIn("Not/AZone", now)).toBe("2026-11-16");
  });
});

describe("streaks", () => {
  const a = (day: string, minutes = 20) => ({ day, minutes });
  it("counts consecutive days ending today", () => {
    expect(currentStreak([a("2026-11-13"), a("2026-11-14"), a("2026-11-15")], "2026-11-15")).toBe(3);
  });
  it("keeps yesterday's streak alive before today's study", () => {
    expect(currentStreak([a("2026-11-13"), a("2026-11-14")], "2026-11-15")).toBe(2);
  });
  it("breaks on a missed day", () => {
    expect(currentStreak([a("2026-11-12"), a("2026-11-15")], "2026-11-15")).toBe(1);
    expect(currentStreak([a("2026-11-12")], "2026-11-15")).toBe(0);
  });
  it("ignores days with zero activity", () => {
    expect(currentStreak([a("2026-11-14", 0), a("2026-11-15")], "2026-11-15")).toBe(1);
    expect(currentStreak([{ day: "2026-11-15", minutes: 0, lessons_done: 1 }], "2026-11-15")).toBe(1);
  });
  it("finds the longest run", () => {
    expect(longestStreak([a("2026-11-01"), a("2026-11-02"), a("2026-11-03"), a("2026-11-10"), a("2026-11-11")])).toBe(3);
    expect(longestStreak([])).toBe(0);
  });
  it("fills the last 7 days with zeros", () => {
    const week = lastNDays([a("2026-11-15", 30), a("2026-11-10", 5)], "2026-11-15");
    expect(week.map((d) => d.day)).toEqual(["2026-11-09", "2026-11-10", "2026-11-11", "2026-11-12", "2026-11-13", "2026-11-14", "2026-11-15"]);
    expect(week.map((d) => d.minutes)).toEqual([0, 5, 0, 0, 0, 0, 30]);
  });
});

describe("levels", () => {
  it("uses the XP curve", () => {
    expect([1, 2, 3, 4].map(xpForLevel)).toEqual([0, 300, 900, 1800]);
    expect(levelFromXp(0)).toMatchObject({ level: 1, progressPct: 0 });
    expect(levelFromXp(299).level).toBe(1);
    expect(levelFromXp(300)).toMatchObject({ level: 2, levelStart: 300, nextLevelAt: 900, progressPct: 0 });
    expect(levelFromXp(600).progressPct).toBe(50);
    expect(levelFromXp(-50).level).toBe(1);
  });
  it("computes percentages safely", () => {
    expect(percent(3, 4)).toBe(75);
    expect(percent(1, 0)).toBe(0);
  });
});
