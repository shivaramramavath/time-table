import type { ReactNode } from "react";

interface FeedbackLayoutProps {
  children: ReactNode;
  history: ReactNode;
  stats: ReactNode;
}

export default function FeedbackLayout({
  children,
  history,
  stats,
}: FeedbackLayoutProps) {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
        <p className="text-muted-foreground">
          Share your thoughts and track the status of your feedback.
        </p>
      </header>

      {stats}

      <div className="grid items-start gap-8 xl:grid-cols-[minmax(320px,0.8fr)_minmax(0,1.4fr)]">
        <section>{children}</section>
        <section>{history}</section>
      </div>
    </main>
  );
}
