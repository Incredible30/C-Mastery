"use client";

import { useActionState } from "react";
import { logStudyMinutes } from "../actions";
import { SubmitButton } from "@/components/forms";

export function StudyLog() {
  const [state, action] = useActionState(logStudyMinutes, null);
  return (
    <form action={action} className="grid gap-1.5">
      <div className="flex items-center gap-2">
        <label htmlFor="minutes" className="sr-only">Minutes studied</label>
        <select id="minutes" name="minutes" defaultValue="15" className="rounded-lg border border-border bg-surface px-2 py-1 text-[13px]">
          {[15, 30, 45, 60].map((m) => <option key={m} value={m}>{m} min</option>)}
        </select>
        <SubmitButton size="sm" variant="secondary" pendingText="Saving…">Log study</SubmitButton>
      </div>
      {state && <span role="status" className={state.ok ? "text-xs text-good" : "text-xs text-bad"}>{state.ok ? state.message : state.error}</span>}
    </form>
  );
}
