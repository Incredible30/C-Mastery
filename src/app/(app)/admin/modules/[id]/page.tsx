import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, ButtonLink, Callout, Card, PageHeader } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import { deleteModule, saveModule } from "../../actions";
import { DeleteForm, ModuleForm } from "../../forms";
import { statusTone } from "../../status";

export default async function EditModulePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ created?: string; deleted?: string }> }) {
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const supabase = await createClient();
  const { data: mod } = await supabase.from("modules").select("*").eq("id", id).maybeSingle();
  if (!mod) notFound();
  const { data: lessons } = await supabase.from("lessons").select("*").eq("module_id", id).order("position");

  return (
    <div className="grid gap-5">
      <PageHeader crumbs={<Link href="/admin" className="text-accent">Course Admin</Link>} title={mod.title}
        actions={<>{mod.status === "published" && <ButtonLink href={`/learn/${mod.slug}`} size="sm">View as learner</ButtonLink>}<DeleteForm action={deleteModule.bind(null, mod.id, mod.course_id)} label="Delete module" /></>} />
      {sp.created && <Callout tone="good">Module created. Add lessons below, then publish it.</Callout>}
      {sp.deleted && <Callout tone="good">The lesson was deleted.</Callout>}
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <Card><h2 className="mb-4 text-lg font-bold">Module details</h2><ModuleForm action={saveModule.bind(null, mod.id)} courseId={mod.course_id} module={mod} /></Card>
        <Card className="h-fit">
          <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold">Lessons</h2><ButtonLink href={`/admin/lessons/new?module=${mod.id}`} size="sm" variant="primary">New lesson</ButtonLink></div>
          <ol className="divide-y divide-border">
            {(lessons ?? []).map((l) => (
              <li key={l.id} className="flex items-center gap-3 py-2.5">
                <span className="w-6 text-right text-xs tabular-nums text-muted">{l.position}</span>
                <Link href={`/admin/lessons/${l.id}`} className="min-w-0 flex-1 truncate font-medium text-accent">{l.title}</Link>
                {l.is_free_preview && <Badge tone="accent">Preview</Badge>}
                <Badge tone={statusTone(l.status)}>{l.status}</Badge>
              </li>
            ))}
          </ol>
          {!lessons?.length && <p className="text-muted">No lessons yet.</p>}
        </Card>
      </div>
    </div>
  );
}
