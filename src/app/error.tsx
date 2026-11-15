"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="mx-auto grid max-w-md gap-3 px-4 py-24 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-muted">The page could not load. Try again, and if it keeps happening, contact support{error.digest ? ` with reference ${error.digest}` : ""}.</p>
      <div><Button variant="primary" onClick={reset}>Try again</Button></div>
    </div>
  );
}
