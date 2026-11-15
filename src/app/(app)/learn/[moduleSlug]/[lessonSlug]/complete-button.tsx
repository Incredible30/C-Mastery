"use client";

import { useActionState } from "react";
import { completeLesson } from "../../../actions";
import { SubmitButton } from "@/components/forms";

export function CompleteButton({ lessonId }: { lessonId: string }) {
  const [state, action] = useActionState(completeLesson, null);
  return (
    <form action={action} className="flex flex-wrap items-center gap-3">
      <input type="hidden" name="lessonId" value={lessonId} />
      <SubmitButton pendingText="Saving…">Mark complete</SubmitButton>
      {state && <span role="status" className={state.ok ? "text-[13px] text-good" : "text-[13px] text-bad"}>{state.ok ? state.message : state.error}</span>}
    </form>
  );
}
