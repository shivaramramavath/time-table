"use client";

import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

import FeedbackErrorBoundary from "@/features/feedback/components/feedback-error-boundary";
import FeedbackForm from "@/features/feedback/components/feedback-form";
import FeedbackHistory from "@/features/feedback/components/feedback-history";
import FeedbackSkeleton from "@/features/feedback/components/feedback-skeleton";

export default function FeedbackPage() {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 md:px-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>

        <p className="text-muted-foreground">
          Share your thoughts and track the status of your feedback.
        </p>
      </header>

      <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <FeedbackForm />

        <QueryErrorResetBoundary>
          {({ reset }) => (
            <FeedbackErrorBoundary key={String(reset)}>
              <Suspense fallback={<FeedbackSkeleton />}>
                <FeedbackHistory />
              </Suspense>
            </FeedbackErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </main>
  );
}
