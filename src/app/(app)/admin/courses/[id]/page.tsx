import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, PageHeader } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import { saveCourse } from "../../actions";
import { CourseForm } from "../../forms";

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: course } = await supabase.from("courses").select("*").eq("id", id).maybeSingle();
  if (!course) notFound();
  return (
    <div className="grid gap-5">
      <PageHeader crumbs={<Link href="/admin" className="text-accent">Course Admin</Link>} title={`Edit ${course.title}`} />
      <Card className="max-w-3xl"><CourseForm action={saveCourse.bind(null, course.id)} course={course} /></Card>
    </div>
  );
}
