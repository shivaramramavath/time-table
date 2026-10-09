export default function Loading() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />

      <p className="text-sm text-muted-foreground">Loading, please wait...</p>
    </main>
  );
}
