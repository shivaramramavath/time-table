import { Skeleton } from "@/shared/components/ui/skeleton";

export default function TimetablesLoading() {
  return (
    <section
      className="space-y-4"
      aria-label="Loading timetables"
      aria-busy="true"
    >
      <Skeleton className="h-6 w-40" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-3 rounded-xl border p-4">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </section>
  );
}
