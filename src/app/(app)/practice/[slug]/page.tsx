import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui";
import { requireViewer } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import { canAccessPlan, PLAN_LABEL } from "@/lib/plans";
import { sortProblems } from "@/lib/practice-order";
import { Workspace, type PastSubmission } from "./workspace";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug.replace(/-/g, " ") };
}

const LEVEL_TONE = { easy: "good", medium: "warn", hard: "bad" } as const;

export default async function ProblemPage({ params }: Params) {
  const { slug } = await params;
  const viewer = await requireViewer(`/practice/${slug}`);
  const supabase = await createClient();
  const { data: problem } = await supabase.from("problems").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
  if (!problem) notFound();

  // RLS returns only the visible sample tests here; hidden tests stay on the server.
  const [{ data: samples }, { data: subs }, { data: list }] = await Promise.all([
    supabase.from("test_cases").select("input, expected_output").eq("problem_id", problem.id).eq("is_hidden", false).order("position"),
    supabase.from("submissions").select("id, status, passed, total, runtime_ms, created_at, source_code")
      .eq("user_id", viewer.id).eq("problem_id", problem.id).order("created_at", { ascending: false }).limit(15),
    supabase.from("problems").select("slug, title, difficulty, module_id").eq("status", "published"),
  ]);
  const { data: modules } = await supabase.from("modules").select("id, position");
  const order = sortProblems(list ?? [], new Map((modules ?? []).map((m) => [m.id, m.position]))).map((p) => p.slug);
  const next = order[order.indexOf(slug) + 1];
  const locked = !canAccessPlan(viewer.plan, problem.required_plan);
  const solved = (subs ?? []).some((s) => s.status === "accepted");

  const statement = (
    <div className="grid gap-5">
      <article className="prose-lesson"><ReactMarkdown remarkPlugins={[remarkGfm]}>{problem.statement_md}</ReactMarkdown></article>
      {(samples ?? []).map((s, i) => (
        <div key={i} className="grid gap-2">
          <h3 className="font-semibold">Example {i + 1}</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            <div><div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">Input</div><pre className="overflow-x-auto rounded-lg border border-border bg-code p-3 font-mono text-[13px]">{s.input}</pre></div>
            <div><div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">Output</div><pre className="overflow-x-auto rounded-lg border border-border bg-code p-3 font-mono text-[13px]">{s.expected_output}</pre></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="grid gap-4">
      <div>
        <div className="mb-1.5 text-[13px] text-muted"><Link href="/practice" className="text-accent">Coding Practice</Link> / {problem.topic}</div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-[1.6rem] font-bold leading-tight">{problem.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[13px]">
              <Badge tone={LEVEL_TONE[problem.difficulty]}>{problem.difficulty}</Badge>
              <Badge>{problem.topic}</Badge>
              <Badge tone="amber">+{problem.xp} XP</Badge>
              <span className="text-muted">Time limit {problem.time_limit_ms / 1000}s</span>
              {solved && <Badge tone="good">Solved</Badge>}
              {locked && <Badge tone="amber">{PLAN_LABEL[problem.required_plan]} plan</Badge>}
            </div>
          </div>
          {next && <Link href={`/practice/${next}`} className="text-[13.5px] font-medium text-accent">Next problem →</Link>}
        </div>
      </div>
      <Workspace
        slug={problem.slug}
        starter={problem.starter_code}
        hints={problem.hints}
        locked={locked}
        lockedPlan={PLAN_LABEL[problem.required_plan]}
        statement={statement}
        submissions={(subs ?? []) as PastSubmission[]}
      />
    </div>
  );
}
