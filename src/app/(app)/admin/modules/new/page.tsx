import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, PageHeader } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import { saveModule } from "../../actions";
import { ModuleForm } from "../../forms";

export default async function NewModulePage({ searchParams }: { searchParams: Promise<{ course?: string }> }) {
  const { course: courseId } = await searchParams;
  if (!courseId) notFound();
  const supabase = await createClient();
  const { data: course } = await supabase.from("courses").select("id, title").eq("id", courseId).maybeSingle();
  if (!course) notFound();
  return (
    <div className="grid gap-5">
      <PageHeader crumbs={<Link href="/admin" className="text-accent">Course Admin</Link>} title="New module" description={`Adds a module to ${course.title}. It stays hidden until you publish it.`} />
      <Card className="max-w-3xl"><ModuleForm action={saveModule.bind(null, null)} courseId={course.id} /></Card>
    </div>
  );
}
