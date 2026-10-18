import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <section className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8">
        <div className="space-y-3 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-primary text-2xl font-bold text-primary-foreground">
            S
          </div>

          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>

          <p className="text-sm text-muted-foreground">
            Sign in to your account or create a new one.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/signin"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-4 font-medium text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Sign in
          </Link>

          <Link
            href="/signup"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-secondary px-4 font-medium text-secondary-foreground transition-colors hover:bg-secondary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Create an account
          </Link>
        </div>

        <p className="text-center text-xs text-text-muted">
          Simple. Secure. Built for you.
        </p>
      </section>
    </main>
  );
}
