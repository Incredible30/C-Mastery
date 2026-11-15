"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { PostgrestError } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth/session";
import { STAFF_ROLES } from "@/lib/auth/roles";
import { courseSchema, lessonSchema, moduleSchema, parseForm, type ActionResult } from "@/lib/validation";

/*
 * Every action re-checks the role here AND runs as the user, so RLS ("staff write" policies)
 * rejects the write even if this check were bypassed.
 */

const uuid = z.string().uuid();

function dbError(error: PostgrestError, what: string): ActionResult {
  if (error.code === "23505") return { ok: false, error: `That slug is already used by another ${what}.`, fieldErrors: { slug: "Already in use" } };
  if (error.code === "42501") return { ok: false, error: "You don't have permission to change this." };
  console.error(`admin ${what} write failed`, error.code, error.message);
  return { ok: false, error: `Couldn't save the ${what}. Try again.` };
}

function revalidateCatalog() {
  revalidatePath("/admin", "layout");
  revalidatePath("/learn", "layout");
  revalidatePath("/dashboard");
}

export async function saveCourse(id: string, _prev: ActionResult | null, form: FormData): Promise<ActionResult> {
  await requireRole(STAFF_ROLES);
  if (!uuid.safeParse(id).success) return { ok: false, error: "Unknown course." };
  const parsed = parseForm(courseSchema, form);
  if (!parsed.ok) return parsed;
  const supabase = await createClient();
  const { error } = await supabase.from("courses").update(parsed.data).eq("id", id);
  if (error) return dbError(error, "course");
  revalidateCatalog();
  return { ok: true, message: "Course saved." };
}

export async function saveModule(id: string | null, _prev: ActionResult | null, form: FormData): Promise<ActionResult> {
  await requireRole(STAFF_ROLES);
  const parsed = parseForm(moduleSchema, form);
  if (!parsed.ok) return parsed;
  const d = parsed.data;
  const row = { course_id: d.courseId, title: d.title, slug: d.slug, summary: d.summary, level: d.level, position: d.position,
    estimated_hours: d.estimatedHours, outcomes: d.outcomes, required_plan: d.requiredPlan, status: d.status };
  const supabase = await createClient();
  if (id) {
    if (!uuid.safeParse(id).success) return { ok: false, error: "Unknown module." };
    const { error } = await supabase.from("modules").update(row).eq("id", id);
    if (error) return dbError(error, "module");
    revalidateCatalog();
    return { ok: true, message: "Module saved." };
  }
  const { data, error } = await supabase.from("modules").insert(row).select("id").single();
  if (error) return dbError(error, "module");
  revalidateCatalog();
  redirect(`/admin/modules/${data.id}?created=1`);
}

export async function saveLesson(id: string | null, _prev: ActionResult | null, form: FormData): Promise<ActionResult> {
  await requireRole(STAFF_ROLES);
  const parsed = parseForm(lessonSchema, form);
  if (!parsed.ok) return parsed;
  const d = parsed.data;
  const row = { module_id: d.moduleId, title: d.title, slug: d.slug, kind: d.kind, estimated_minutes: d.estimatedMinutes,
    position: d.position, is_free_preview: d.isFreePreview, status: d.status };
  const supabase = await createClient();

  let lessonId = id;
  if (id) {
    if (!uuid.safeParse(id).success) return { ok: false, error: "Unknown lesson." };
    const { error } = await supabase.from("lessons").update(row).eq("id", id);
    if (error) return dbError(error, "lesson");
  } else {
    const { data, error } = await supabase.from("lessons").insert(row).select("id").single();
    if (error) return dbError(error, "lesson");
    lessonId = data.id;
  }
  const { error: bodyError } = await supabase.from("lesson_contents").upsert({ lesson_id: lessonId!, body_md: d.bodyMd });
  if (bodyError) return dbError(bodyError, "lesson body");
  revalidateCatalog();
  if (!id) redirect(`/admin/lessons/${lessonId}?created=1`);
  return { ok: true, message: "Lesson saved." };
}

export async function deleteModule(id: string, courseId: string): Promise<void> {
  await requireRole(STAFF_ROLES);
  if (!uuid.safeParse(id).success) return;
  const supabase = await createClient();
  const { error } = await supabase.from("modules").delete().eq("id", id);
  if (error) throw new Error("Couldn't delete the module.");
  revalidateCatalog();
  redirect(`/admin?deleted=module&course=${courseId}`);
}

export async function deleteLesson(id: string, moduleId: string): Promise<void> {
  await requireRole(STAFF_ROLES);
  if (!uuid.safeParse(id).success) return;
  const supabase = await createClient();
  const { error } = await supabase.from("lessons").delete().eq("id", id);
  if (error) throw new Error("Couldn't delete the lesson.");
  revalidateCatalog();
  redirect(`/admin/modules/${moduleId}?deleted=lesson`);
}
