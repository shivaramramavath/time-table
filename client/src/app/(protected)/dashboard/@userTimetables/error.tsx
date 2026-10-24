"use client";

import { Button } from "@/shared/components/ui/button";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function TimetablesError({ error, reset }: Props) {
  const { reset: resetQuery } = useQueryErrorResetBoundary();

  return (
    <section className="flex min-h-56 flex-col items-center justify-center gap-4 rounded-xl border border-destructive/20 bg-destructive-muted/30 p-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive-muted">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-6 w-6 text-destructive"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
      </div>

      <div className="space-y-1.5">
        <h2 className="text-lg font-semibold text-destructive">
          Unable to load timetables
        </h2>

        <p className="max-w-sm text-sm text-muted-foreground">
          We couldn't retrieve your timetables. Check your connection and try
          again.
        </p>
      </div>

      <Button
        variant="destructive"
        onClick={() => {
          resetQuery();
          reset();
        }}
        className="bg-destructive text-white hover:bg-destructive/90"
      >
        Try again
      </Button>

      {process.env.NODE_ENV === "development" && (
        <p className="max-w-md break-words text-xs text-muted-foreground">
          {error.message}
        </p>
      )}
    </section>
  );
}
