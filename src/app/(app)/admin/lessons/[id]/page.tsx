import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink, Callout, Card, PageHeader } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import { deleteLesson, saveLesson } from "../../actions";
import { DeleteForm, LessonForm } from "../../forms";

export default async function EditLessonPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ created?: string }> }) {
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const supabase = await createClient();
  const { data: lesson } = await supabase.from("lessons").select("*").eq("id", id).maybeSingle();
  if (!lesson) notFound();
  const [{ data: mod }, { data: content }] = await Promise.all([
    supabase.from("modules").select("id, title, slug, status").eq("id", lesson.module_id).single(),
    supabase.from("lesson_contents").select("body_md").eq("lesson_id", id).maybeSingle(),
  ]);

  return (
    <div className="grid gap-5">
      <PageHeader
        crumbs={<><Link href="/admin" className="text-accent">Course Admin</Link> / <Link href={`/admin/modules/${lesson.module_id}`} className="text-accent">{mod?.title}</Link></>}
        title={lesson.title}
        actions={<>{lesson.status === "published" && mod?.status === "published" && <ButtonLink href={`/learn/${mod.slug}/${lesson.slug}`} size="sm">View as learner</ButtonLink>}
          <DeleteForm action={deleteLesson.bind(null, lesson.id, lesson.module_id)} label="Delete lesson" /></>}
      />
      {sp.created && <Callout tone="good">Lesson created. Publish it when the content is ready.</Callout>}
      <Card className="max-w-4xl"><LessonForm action={saveLesson.bind(null, lesson.id)} moduleId={lesson.module_id} lesson={lesson} body={content?.body_md ?? ""} /></Card>
    </div>
  );
}
