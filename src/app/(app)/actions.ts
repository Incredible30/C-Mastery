"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireViewer } from "@/lib/auth/session";
import { studyMinutesSchema, type ActionResult } from "@/lib/validation";
import { z } from "zod";

export async function logStudyMinutes(_prev: ActionResult<number> | null, form: FormData): Promise<ActionResult<number>> {
  await requireViewer();
  const minutes = studyMinutesSchema.safeParse(form.get("minutes"));
  if (!minutes.success) return { ok: false, error: "Log between 1 and 240 minutes." };
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("log_study_minutes", { p_minutes: minutes.data });
  if (error) {
    console.error("log_study_minutes", error.code, error.message);
    return { ok: false, error: "Couldn't save your study time. Try again." };
  }
  revalidatePath("/dashboard");
  return { ok: true, data: data ?? 0, message: `Logged ${minutes.data} minutes.` };
}

export async function completeLesson(_prev: ActionResult | null, form: FormData): Promise<ActionResult> {
  await requireViewer();
  const lessonId = z.string().uuid().safeParse(form.get("lessonId"));
  if (!lessonId.success) return { ok: false, error: "Unknown lesson." };
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("complete_lesson", { p_lesson_id: lessonId.data });
  if (error) {
    if (error.code === "42501") return { ok: false, error: "This lesson is part of a paid plan." };
    console.error("complete_lesson", error.code, error.message);
    return { ok: false, error: "Couldn't mark the lesson complete. Try again." };
  }
  revalidatePath("/learn", "layout");
  revalidatePath("/dashboard");
  return { ok: true, message: data ? "Lesson complete. +25 XP" : "Already completed." };
}
