import { describe, expect, it } from "vitest";
import { lessonSchema, moduleSchema, parseForm, signUpSchema, studyMinutesSchema } from "./validation";

const form = (o: Record<string, string>) => { const f = new FormData(); Object.entries(o).forEach(([k, v]) => f.append(k, v)); return f; };
const uuid = "3f2a9c1e-5b7d-4e8a-9c21-7d4e5f6a8b90";

describe("sign up", () => {
  it("accepts a strong password and normalises email", () => {
    const r = signUpSchema.safeParse({ fullName: " Priya ", email: " Priya@Example.IN ", password: "pointers42!" });
    expect(r.success && r.data).toMatchObject({ fullName: "Priya", email: "priya@example.in" });
  });
  it.each(["short1", "onlyletters", "1234567890"])("rejects weak password %s", (password) => {
    expect(signUpSchema.safeParse({ fullName: "Priya", email: "p@x.in", password }).success).toBe(false);
  });
});

describe("module form", () => {
  const base = { courseId: uuid, title: "Pointers", slug: "Pointers", summary: "", level: "intermediate",
    position: "5", estimatedHours: "7", outcomes: "Read pointers\n\n  Use & and *  \n", requiredPlan: "pro", status: "published" };
  it("coerces numbers, lowercases slug and splits outcomes", () => {
    const r = parseForm(moduleSchema, form(base));
    expect(r.ok && r.data).toMatchObject({ slug: "pointers", position: 5, estimatedHours: 7, outcomes: ["Read pointers", "Use & and *"] });
  });
  it("reports field errors", () => {
    const r = parseForm(moduleSchema, form({ ...base, slug: "bad slug!", requiredPlan: "gold", courseId: "x" }));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(Object.keys(r.fieldErrors).sort()).toEqual(["courseId", "requiredPlan", "slug"]);
  });
});

describe("lesson form", () => {
  const base = { moduleId: uuid, title: "Pointer arithmetic", slug: "pointer-arithmetic", kind: "lesson",
    estimatedMinutes: "16", position: "3", status: "draft", bodyMd: "# Hi" };
  it("reads the free preview checkbox", () => {
    const on = parseForm(lessonSchema, form({ ...base, isFreePreview: "on" }));
    const off = parseForm(lessonSchema, form(base));
    expect(on.ok && on.data.isFreePreview).toBe(true);
    expect(off.ok && off.data.isFreePreview).toBe(false);
  });
  it("rejects out-of-range minutes", () => {
    expect(parseForm(lessonSchema, form({ ...base, estimatedMinutes: "0" })).ok).toBe(false);
    expect(parseForm(lessonSchema, form({ ...base, estimatedMinutes: "601" })).ok).toBe(false);
  });
});

describe("study minutes", () => {
  it("allows 1–240", () => {
    expect(studyMinutesSchema.safeParse("15").success).toBe(true);
    expect(studyMinutesSchema.safeParse("0").success).toBe(false);
    expect(studyMinutesSchema.safeParse("241").success).toBe(false);
    expect(studyMinutesSchema.safeParse("1.5").success).toBe(false);
  });
});
