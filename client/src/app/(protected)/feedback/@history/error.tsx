"use client";

import { Button } from "@/shared/components/ui/button";
import { useEffect } from "react";

export default function FeedbackError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Feedback history error:", error);
  }, [error]);

  return (
    <section className="rounded-xl border border-border p-6">
      <h2 className="font-semibold">Unable to load feedback history</h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Something went wrong while loading your previous feedback.
      </p>

      <Button className="mt-4" onClick={reset} variant="outline">
        Try again
      </Button>
    </section>
  );
}
