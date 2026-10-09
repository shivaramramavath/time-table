import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-5 px-6 text-center">
      <p className="text-8xl font-bold tracking-tight text-primary">404</p>

      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>

      <p className="max-w-md text-sm text-muted-foreground">
        Sorry, the page you are looking for exist or may have been
        moved.
      </p>

      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Back to home
      </Link>
    </main>
  );
}
