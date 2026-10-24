export default function TimetableEmptyState() {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 text-center">
      <h2 className="text-base font-medium">No matching timetables</h2>

      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Try another title, description, or status.
      </p>
    </div>
  );
}
