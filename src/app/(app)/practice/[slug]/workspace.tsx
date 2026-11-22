"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Badge, Button, cn } from "@/components/ui";
import type { SubmissionStatus } from "@/lib/database.types";
import type { TestOutcome } from "@/lib/judge/grade";
import type { RunResponse, SubmitResponse } from "@/lib/judge/service";

const Editor = dynamic(() => import("@monaco-editor/react").then((m) => m.default), {
  ssr: false,
  loading: () => <div className="grid h-full place-items-center text-[13px] text-muted">Loading editor…</div>,
});

export type PastSubmission = {
  id: string; status: SubmissionStatus; passed: number; total: number; runtime_ms: number | null; created_at: string; source_code: string;
};

const VERDICT: Record<string, { label: string; tone: "good" | "bad" | "warn" | "neutral" }> = {
  accepted: { label: "Accepted", tone: "good" },
  wrong_answer: { label: "Wrong answer", tone: "bad" },
  compile_error: { label: "Compilation error", tone: "bad" },
  runtime_error: { label: "Runtime error", tone: "bad" },
  time_limit: { label: "Time limit exceeded", tone: "warn" },
  internal_error: { label: "Judge error", tone: "warn" },
  ok: { label: "Ran successfully", tone: "good" },
  queued: { label: "Queued", tone: "neutral" },
  running: { label: "Running", tone: "neutral" },
};

const REASON: Record<TestOutcome["status"], string> = {
  ok: "Passed", wrong_answer: "Wrong answer", runtime_error: "Runtime error (crash)",
  time_limit: "Too slow", compile_error: "Did not compile", internal_error: "Judge error",
};

type Result =
  | { mode: "run"; data: RunResponse }
  | { mode: "submit"; data: SubmitResponse };

function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const read = () => {
      const t = document.documentElement.dataset.theme;
      setDark(t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches);
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const mq = matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", read);
    return () => { obs.disconnect(); mq.removeEventListener("change", read); };
  }, []);
  return dark;
}

export function Workspace({ slug, starter, hints, locked, lockedPlan, statement, submissions }: {
  slug: string; starter: string; hints: string[]; locked: boolean; lockedPlan: string; statement: ReactNode; submissions: PastSubmission[];
}) {
  const router = useRouter();
  const dark = useDarkMode();
  const draftKey = `cm-draft-${slug}`;
  const [code, setCode] = useState(starter);
  const [tab, setTab] = useState<"problem" | "hints" | "submissions">("problem");
  const [hintsShown, setHintsShown] = useState(0);
  const [useCustom, setUseCustom] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [busy, setBusy] = useState<"run" | "submit" | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState(submissions);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try { const d = localStorage.getItem(draftKey); if (d) setCode(d); } catch { /* storage blocked */ }
  }, [draftKey]);

  function onChange(value: string | undefined) {
    const v = value ?? "";
    setCode(v);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => { try { localStorage.setItem(draftKey, v); } catch { /* storage blocked */ } }, 500);
  }

  function reset() {
    if (!confirm("Replace your code with the starter code?")) return;
    setCode(starter);
    try { localStorage.removeItem(draftKey); } catch { /* storage blocked */ }
  }

  async function call(mode: "run" | "submit") {
    setBusy(mode);
    setError(null);
    setResult(null);
    try {
      const body: Record<string, string> = { slug, source: code };
      if (mode === "run" && useCustom) body.stdin = customInput;
      const res = await fetch(`/api/judge/${mode}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json().catch(() => ({ error: "The server sent an unexpected response." }));
      if (!res.ok) { setError(data.error ?? "Something went wrong."); return; }
      if (mode === "submit") {
        const s = data as SubmitResponse;
        setResult({ mode, data: s });
        setHistory((h) => [{ id: s.submissionId, status: s.verdict, passed: s.passed, total: s.total, runtime_ms: s.maxTimeMs, created_at: new Date().toISOString(), source_code: code }, ...h]);
        if (s.firstSolve) router.refresh();
      } else {
        setResult({ mode, data: data as RunResponse });
      }
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setBusy(null);
    }
  }

  const tabBtn = (id: typeof tab, label: string) => (
    <button type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)}
      className={cn("rounded-md px-3 py-1.5 text-[13.5px] font-medium", tab === id ? "bg-surface text-fg shadow-sm" : "text-muted hover:text-fg")}>{label}</button>
  );

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      {/* Left: problem, hints, submissions */}
      <section className="min-w-0 rounded-xl border border-border bg-surface">
        <div className="flex gap-1 border-b border-border bg-surface-2 p-1.5" role="tablist">
          {tabBtn("problem", "Problem")}
          {tabBtn("hints", `Hints (${hints.length})`)}
          {tabBtn("submissions", `Submissions (${history.length})`)}
        </div>
        <div className="max-h-[calc(100vh-220px)] min-h-[420px] overflow-y-auto p-5">
          {tab === "problem" && statement}
          {tab === "hints" && (
            <div className="grid gap-3">
              <p className="text-[13.5px] text-muted">Hints go from a gentle nudge to a near-solution. Try each one before opening the next.</p>
              {hints.slice(0, hintsShown).map((h, i) => (
                <div key={i} className="rounded-lg bg-accent-soft px-4 py-3 text-[14px] text-accent-strong"><b>Hint {i + 1}.</b> {h}</div>
              ))}
              {hintsShown < hints.length
                ? <div><Button onClick={() => setHintsShown((n) => n + 1)}>Show hint {hintsShown + 1} of {hints.length}</Button></div>
                : <p className="text-[13.5px] text-muted">That&apos;s every hint. You&apos;ve got this.</p>}
            </div>
          )}
          {tab === "submissions" && (
            history.length === 0 ? <p className="text-muted">No submissions yet. Submit your code to see it here.</p> : (
              <ul className="divide-y divide-border">
                {history.map((s) => {
                  const v = VERDICT[s.status] ?? VERDICT.internal_error;
                  return (
                    <li key={s.id} className="flex flex-wrap items-center gap-3 py-2.5">
                      <Badge tone={v.tone}>{v.label}</Badge>
                      <span className="text-[13px] tabular-nums text-muted">{s.passed}/{s.total} tests{s.runtime_ms !== null ? ` · ${s.runtime_ms} ms` : ""}</span>
                      <time className="ml-auto text-xs text-faint" dateTime={s.created_at}>{new Date(s.created_at).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</time>
                      <Button size="sm" variant="ghost" onClick={() => { setCode(s.source_code); }}>Load code</Button>
                    </li>
                  );
                })}
              </ul>
            )
          )}
        </div>
      </section>

      {/* Right: editor and results */}
      <section className="grid min-w-0 content-start gap-3">
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2">
            <span className="rounded-md bg-surface-2 px-2.5 py-1 font-mono text-xs">solution.c</span>
            <span className="text-xs text-muted">C11 · GCC</span>
            <span className="flex-1" />
            <Button size="sm" variant="ghost" onClick={reset} disabled={!!busy}>Reset</Button>
            <Button size="sm" onClick={() => call("run")} disabled={!!busy || locked}>{busy === "run" ? "Running…" : useCustom ? "Run with input" : "Run examples"}</Button>
            <Button size="sm" variant="primary" onClick={() => call("submit")} disabled={!!busy || locked}>{busy === "submit" ? "Judging…" : "Submit"}</Button>
          </div>
          <div className="h-[440px]">
            <Editor
              language="c"
              theme={dark ? "vs-dark" : "light"}
              value={code}
              onChange={onChange}
              options={{ minimap: { enabled: false }, fontSize: 14, fontFamily: "JetBrains Mono, Consolas, monospace", tabSize: 4, scrollBeyondLastLine: false, automaticLayout: true, padding: { top: 12 } }}
            />
          </div>
          <div className="border-t border-border px-3 py-2">
            <label className="flex items-center gap-2 text-[13px]">
              <input type="checkbox" checked={useCustom} onChange={(e) => setUseCustom(e.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />
              Test with my own input
            </label>
            {useCustom && (
              <textarea value={customInput} onChange={(e) => setCustomInput(e.target.value)} rows={3} placeholder="Type the input your program should read"
                aria-label="Custom input" className="mt-2 w-full rounded-lg border border-border bg-code px-3 py-2 font-mono text-[13px] outline-none focus:border-accent" />
            )}
          </div>
        </div>

        {locked && <div className="rounded-lg bg-amber-soft px-4 py-3 text-[14px] text-amber">This problem is part of the {lockedPlan} plan. You can read it, but running and submitting need an upgrade.</div>}
        {error && <div role="alert" className="rounded-lg bg-bad-soft px-4 py-3 text-[14px] text-bad">{error}</div>}
        {busy && <div className="rounded-xl border border-border bg-surface px-4 py-3 text-[14px] text-muted">{busy === "submit" ? "Judging against all tests, including hidden ones…" : "Running your code…"}</div>}
        {result && <Results result={result} />}
      </section>
    </div>
  );
}

function Results({ result }: { result: Result }) {
  const d = result.data;
  if ("kind" in d && d.kind === "custom") {
    const v = VERDICT[d.status] ?? VERDICT.internal_error;
    return (
      <div className="grid gap-2 rounded-xl border border-border bg-surface p-4">
        <div className="flex items-center gap-2"><Badge tone={v.tone}>{v.label}</Badge>{d.timeMs !== null && <span className="text-xs text-muted">{d.timeMs} ms</span>}</div>
        {d.compileOutput ? <Pre label="Compiler output" text={d.compileOutput} bad /> : <Pre label="Your output" text={d.stdout || "(no output)"} />}
        {d.stderr && <Pre label="Error output" text={d.stderr} bad />}
      </div>
    );
  }

  const g = d as Exclude<RunResponse, { kind: "custom" }> | SubmitResponse;
  const v = VERDICT[g.verdict] ?? VERDICT.internal_error;
  const submit = result.mode === "submit" ? (d as SubmitResponse) : null;
  return (
    <div className="grid gap-3 rounded-xl border border-border bg-surface p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className={cn("font-display text-xl font-bold", v.tone === "good" ? "text-good" : v.tone === "warn" ? "text-warn" : "text-bad")}>{v.label}</span>
        {g.verdict !== "compile_error" && <span className="text-[13.5px] tabular-nums text-muted">{g.passed}/{g.total} {result.mode === "submit" ? "tests" : "examples"} passed{g.maxTimeMs !== null ? ` · ${g.maxTimeMs} ms` : ""}</span>}
      </div>
      {submit?.firstSolve && <div className="rounded-lg bg-good-soft px-4 py-3 text-[14px] text-good"><b>Solved! +{submit.xp} XP.</b> It now counts toward your dashboard and the leaderboard.</div>}
      {result.mode === "run" && g.verdict === "accepted" && <p className="text-[13.5px] text-muted">The examples pass. Submit to be judged on the hidden tests too.</p>}
      {g.compileOutput && <Pre label="Compiler output" text={g.compileOutput} bad />}
      {g.outcomes.length > 0 && (
        <ul className="grid gap-2">
          {g.outcomes.map((o) => (
            <li key={o.index} className="rounded-lg border border-border">
              {o.hidden ? (
                <div className="flex items-center gap-2 px-3 py-2 text-[13.5px]">
                  <span className={o.passed ? "text-good" : "text-bad"}>{o.passed ? "✓" : "✗"}</span>
                  <span>Hidden test {o.index}</span><span className="text-muted">· {REASON[o.status]}</span>
                </div>
              ) : (
                <details open={!o.passed}>
                  <summary className="flex cursor-pointer items-center gap-2 px-3 py-2 text-[13.5px]">
                    <span className={o.passed ? "text-good" : "text-bad"}>{o.passed ? "✓" : "✗"}</span>
                    <span>Example {o.index}</span><span className="text-muted">· {REASON[o.status]}{o.timeMs !== null ? ` · ${o.timeMs} ms` : ""}</span>
                  </summary>
                  <div className="grid gap-2 border-t border-border p-3 sm:grid-cols-3">
                    <Pre label="Input" text={o.input ?? ""} />
                    <Pre label="Expected" text={o.expected ?? ""} />
                    <Pre label="Your output" text={o.actual || "(no output)"} bad={!o.passed} />
                    {o.stderr && <div className="sm:col-span-3"><Pre label="Error output" text={o.stderr} bad /></div>}
                  </div>
                </details>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Pre({ label, text, bad }: { label: string; text: string; bad?: boolean }) {
  return (
    <div className="min-w-0">
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted">{label}</div>
      <pre className={cn("max-h-56 overflow-auto rounded-lg border bg-code p-2.5 font-mono text-[12.5px] whitespace-pre-wrap", bad ? "border-bad/40" : "border-border")}>{text}</pre>
    </div>
  );
}
