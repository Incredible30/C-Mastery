"use client";

import { useActionState } from "react";
import { Field, FormMessage, Select, SubmitButton, TextArea } from "@/components/forms";
import { Button } from "@/components/ui";
import type { Course, Lesson, Module } from "@/lib/database.types";
import type { ActionResult } from "@/lib/validation";

type Action = (prev: ActionResult | null, form: FormData) => Promise<ActionResult>;

const STATUS = [{ value: "draft", label: "Draft (hidden from learners)" }, { value: "published", label: "Published" }, { value: "archived", label: "Archived" }];
const PLANS = [{ value: "free", label: "Free" }, { value: "pro", label: "Pro" }, { value: "premium", label: "Premium" }];

export function CourseForm({ action, course }: { action: Action; course: Course }) {
  const [state, run] = useActionState(action, null);
  const e = state && !state.ok ? state.fieldErrors : undefined;
  return (
    <form action={run} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title" name="title" defaultValue={course.title} required error={e?.title} />
        <Field label="Slug" name="slug" defaultValue={course.slug} required error={e?.slug} hint="Used in links. Lowercase, numbers, hyphens." />
      </div>
      <TextArea label="Description" name="description" defaultValue={course.description} error={e?.description} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Status" name="status" defaultValue={course.status} options={STATUS} error={e?.status} />
        <Field label="Position" name="position" type="number" min={0} defaultValue={course.position} error={e?.position} />
      </div>
      <FormMessage state={state} />
      <div><SubmitButton>Save course</SubmitButton></div>
    </form>
  );
}

export function ModuleForm({ action, courseId, module }: { action: Action; courseId: string; module?: Module }) {
  const [state, run] = useActionState(action, null);
  const e = state && !state.ok ? state.fieldErrors : undefined;
  return (
    <form action={run} className="grid gap-4">
      <input type="hidden" name="courseId" value={courseId} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title" name="title" defaultValue={module?.title} required error={e?.title} />
        <Field label="Slug" name="slug" defaultValue={module?.slug} required error={e?.slug} hint="e.g. dynamic-memory" />
      </div>
      <TextArea label="Summary" name="summary" defaultValue={module?.summary} error={e?.summary} />
      <TextArea label="Learning outcomes" name="outcomes" defaultValue={module?.outcomes.join("\n")} hint="One per line, up to 12." error={e?.outcomes} />
      <div className="grid gap-4 sm:grid-cols-3">
        <Select label="Level" name="level" defaultValue={module?.level ?? "beginner"} error={e?.level}
          options={[{ value: "beginner", label: "Beginner" }, { value: "intermediate", label: "Intermediate" }, { value: "advanced", label: "Advanced" }]} />
        <Field label="Position" name="position" type="number" min={0} defaultValue={module?.position ?? 0} error={e?.position} />
        <Field label="Estimated hours" name="estimatedHours" type="number" step="0.5" min={0.5} defaultValue={module?.estimated_hours ?? 1} error={e?.estimatedHours} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Required plan" name="requiredPlan" defaultValue={module?.required_plan ?? "free"} options={PLANS} error={e?.requiredPlan} />
        <Select label="Status" name="status" defaultValue={module?.status ?? "draft"} options={STATUS} error={e?.status} />
      </div>
      <FormMessage state={state} />
      <div><SubmitButton>{module ? "Save module" : "Create module"}</SubmitButton></div>
    </form>
  );
}

export function LessonForm({ action, moduleId, lesson, body }: { action: Action; moduleId: string; lesson?: Lesson; body?: string }) {
  const [state, run] = useActionState(action, null);
  const e = state && !state.ok ? state.fieldErrors : undefined;
  return (
    <form action={run} className="grid gap-4">
      <input type="hidden" name="moduleId" value={moduleId} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title" name="title" defaultValue={lesson?.title} required error={e?.title} />
        <Field label="Slug" name="slug" defaultValue={lesson?.slug} required error={e?.slug} />
      </div>
      <div className="grid gap-4 sm:grid-cols-4">
        <Select label="Type" name="kind" defaultValue={lesson?.kind ?? "lesson"} error={e?.kind}
          options={[{ value: "lesson", label: "Lesson" }, { value: "quiz", label: "Quiz" }, { value: "project", label: "Project" }]} />
        <Field label="Minutes" name="estimatedMinutes" type="number" min={1} max={600} defaultValue={lesson?.estimated_minutes ?? 10} error={e?.estimatedMinutes} />
        <Field label="Position" name="position" type="number" min={0} defaultValue={lesson?.position ?? 0} error={e?.position} />
        <Select label="Status" name="status" defaultValue={lesson?.status ?? "draft"} options={STATUS} error={e?.status} />
      </div>
      <label className="flex items-center gap-2 text-[13.5px]">
        <input type="checkbox" name="isFreePreview" defaultChecked={lesson?.is_free_preview} className="h-4 w-4 accent-[var(--accent)]" />
        Free preview: readable on every plan
      </label>
      <TextArea label="Lesson content (Markdown)" name="bodyMd" defaultValue={body} className="font-mono" rows={18} error={e?.bodyMd}
        hint="Use ## for headings and ```c fences for code. Raw HTML is not rendered." />
      <FormMessage state={state} />
      <div><SubmitButton>{lesson ? "Save lesson" : "Create lesson"}</SubmitButton></div>
    </form>
  );
}

/** Two-step delete so a single misclick can't remove content. */
export function DeleteForm({ action, label }: { action: () => Promise<void>; label: string }) {
  return (
    <form action={action} onSubmit={(ev) => { if (!confirm(`${label}? This also deletes everything inside it and cannot be undone.`)) ev.preventDefault(); }}>
      <Button type="submit" variant="danger" size="sm">{label}</Button>
    </form>
  );
}
