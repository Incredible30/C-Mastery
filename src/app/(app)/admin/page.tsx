import type { Metadata } from "next";
import Link from "next/link";
import { Badge, ButtonLink, Callout, Card, EmptyState, PageHeader } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import { statusTone } from "./status";

export const metadata: Metadata = { title: "Course Admin" };

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ deleted?: string }> }) {
  const { deleted } = await searchParams;
  const supabase = await createClient();
  const [{ data: courses }, { data: modules }, { data: lessons }] = await Promise.all([
    supabase.from("courses").select("*").order("position"),
    supabase.from("modules").select("*").order("position"),
    supabase.from("lessons").select("id, module_id, status"),
  ]);

  return (
    <div className="grid gap-5">
      <PageHeader title="Course Admin" description="Create and edit modules and lessons. Draft content is hidden from learners until you publish it." />
      {deleted && <Callout tone="good">The {deleted} was deleted.</Callout>}
      {!courses?.length && <Card><EmptyState title="No courses yet">Run the seed script to load the C course (see the instruction book).</EmptyState></Card>}
      {courses?.map((c) => {
        const mods = (modules ?? []).filter((m) => m.course_id === c.id);
        return (
          <Card key={c.id} className="grid gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2"><h2 className="text-lg font-bold">{c.title}</h2><Badge tone={statusTone(c.status)}>{c.status}</Badge></div>
              <div className="flex gap-2">
                <ButtonLink href={`/admin/courses/${c.id}`} size="sm">Edit course</ButtonLink>
                <ButtonLink href={`/admin/modules/new?course=${c.id}`} size="sm" variant="primary">New module</ButtonLink>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px]">
                <thead><tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted"><th className="py-2 pr-3">#</th><th className="py-2 pr-3">Module</th><th className="py-2 pr-3">Plan</th><th className="py-2 pr-3">Lessons</th><th className="py-2">Status</th></tr></thead>
                <tbody>
                  {mods.map((m) => {
                    const ls = (lessons ?? []).filter((l) => l.module_id === m.id);
                    return (
                      <tr key={m.id} className="border-b border-border last:border-0">
                        <td className="py-2.5 pr-3 tabular-nums text-muted">{m.position}</td>
                        <td className="py-2.5 pr-3"><Link href={`/admin/modules/${m.id}`} className="font-medium text-accent">{m.title}</Link></td>
                        <td className="py-2.5 pr-3 capitalize">{m.required_plan}</td>
                        <td className="py-2.5 pr-3 tabular-nums">{ls.filter((l) => l.status === "published").length} published / {ls.length}</td>
                        <td className="py-2.5"><Badge tone={statusTone(m.status)}>{m.status}</Badge></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {!mods.length && <p className="py-4 text-muted">No modules yet.</p>}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
