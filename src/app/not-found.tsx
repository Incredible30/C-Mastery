import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto grid max-w-md gap-3 px-4 py-24 text-center">
      <p className="font-mono text-sm text-accent">error: 404 page not found</p>
      <h1 className="text-2xl font-bold">This page doesn&apos;t exist</h1>
      <p className="text-muted">The link may be wrong, or the page may have moved.</p>
      <div><ButtonLink href="/dashboard" variant="primary">Go to dashboard</ButtonLink></div>
    </div>
  );
}
