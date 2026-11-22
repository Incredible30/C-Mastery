import { z } from "zod";

/** Input schemas shared by server actions. Database CHECK constraints enforce the same limits. */

const slug = (max: number) =>
  z.string().trim().toLowerCase().regex(new RegExp(`^[a-z0-9-]{2,${max}}$`), "Use 2–" + max + " lowercase letters, numbers or hyphens");

export const emailSchema = z.string().trim().toLowerCase().email("Enter a valid email address").max(254);

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Enter your password").max(128),
  next: z.string().optional(),
});

export const signUpSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your name").max(80),
  email: emailSchema,
  password: z.string()
    .min(10, "Use at least 10 characters")
    .max(128)
    .regex(/[a-z]/i, "Include a letter")
    .regex(/[0-9]/, "Include a number"),
});

export const contentStatus = z.enum(["draft", "published", "archived"]);
export const planTier = z.enum(["free", "pro", "premium"]);

export const courseSchema = z.object({
  title: z.string().trim().min(2).max(120),
  slug: slug(60),
  description: z.string().trim().max(2000).default(""),
  status: contentStatus,
  position: z.coerce.number().int().min(0).max(10_000),
});

export const moduleSchema = z.object({
  courseId: z.string().uuid(),
  title: z.string().trim().min(2).max(120),
  slug: slug(60),
  summary: z.string().trim().max(1000).default(""),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  position: z.coerce.number().int().min(0).max(10_000),
  estimatedHours: z.coerce.number().positive().max(999),
  outcomes: z.string().max(2000).default("")
    .transform((s) => s.split("\n").map((l) => l.trim()).filter(Boolean).slice(0, 12)),
  requiredPlan: planTier,
  status: contentStatus,
});

export const lessonSchema = z.object({
  moduleId: z.string().uuid(),
  title: z.string().trim().min(2).max(160),
  slug: slug(80),
  kind: z.enum(["lesson", "quiz", "project"]),
  estimatedMinutes: z.coerce.number().int().min(1).max(600),
  position: z.coerce.number().int().min(0).max(10_000),
  isFreePreview: z.preprocess((v) => v === "on" || v === "true" || v === true, z.boolean()),
  status: contentStatus,
  bodyMd: z.string().max(100_000).default(""),
});

export const studyMinutesSchema = z.coerce.number().int().min(1).max(240);

const utf8Bytes = (s: string) => new TextEncoder().encode(s).length;

/** Body of POST /api/judge/run and /api/judge/submit. */
export const judgeRequestSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]{2,80}$/, "Unknown problem"),
  source: z.string()
    .refine((s) => s.trim().length > 0, "Write some code first")
    .refine((s) => utf8Bytes(s) <= 65_536, "Code is larger than 64 KB"),
  stdin: z.string().refine((s) => utf8Bytes(s) <= 10_000, "Custom input is larger than 10 KB").optional(),
});

export type FieldErrors = Record<string, string>;
export type ActionResult<T = undefined> =
  | { ok: true; data?: T; message?: string }
  | { ok: false; error: string; fieldErrors?: FieldErrors };

/** Validates FormData against a schema and returns the first message per field. */
export function parseForm<S extends z.ZodTypeAny>(schema: S, form: FormData):
  { ok: true; data: z.output<S> } | { ok: false; error: string; fieldErrors: FieldErrors } {
  const raw: Record<string, FormDataEntryValue> = {};
  form.forEach((value, key) => { if (!(key in raw)) raw[key] = value; });
  const parsed = schema.safeParse(raw);
  if (parsed.success) return { ok: true, data: parsed.data };
  const fieldErrors: FieldErrors = {};
  for (const issue of parsed.error.issues) {
    const key = String(issue.path[0] ?? "form");
    fieldErrors[key] ??= issue.message;
  }
  return { ok: false, error: "Check the highlighted fields.", fieldErrors };
}
