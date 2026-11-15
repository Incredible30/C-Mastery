import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, PageHeader } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import { saveLesson } from "../../actions";
import { LessonForm } from "../../forms";

export default async function NewLessonPage({ searchParams }: { searchParams: Promise<{ module?: string }> }) {
  const { module: moduleId } = await searchParams;
  if (!moduleId) notFound();
  const supabase = await createClient();
  const { data: mod } = await supabase.from("modules").select("id, title").eq("id", moduleId).maybeSingle();
  if (!mod) notFound();
  return (
    <div className="grid gap-5">
      <PageHeader crumbs={<><Link href="/admin" className="text-accent">Course Admin</Link> / <Link href={`/admin/modules/${mod.id}`} className="text-accent">{mod.title}</Link></>} title="New lesson" />
      <Card className="max-w-4xl"><LessonForm action={saveLesson.bind(null, null)} moduleId={mod.id} /></Card>
    </div>
  );
}
