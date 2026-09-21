import { Skeleton } from '@/shared/ui/skeleton';

const TimetableCardSkeleton = () => {
  return (
    <article
      className="
        relative overflow-hidden
        rounded-2xl
        border border-border/50
        bg-surface-muted/5
        p-4
        backdrop-blur-sm
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex min-w-0 items-center gap-3">
          {/* Icon */}
          <Skeleton className="size-10 shrink-0 rounded-xl" />

          {/* Title */}
          <Skeleton className="h-5 w-32 rounded-md" />
        </div>

        {/* Delete */}
        <Skeleton className="size-8 rounded-lg" />
      </div>

      {/* Description */}
      <div className="mt-3 space-y-2">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-3/4 rounded-md" />
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">
        <Skeleton className="h-3 w-20 rounded-md" />

        <Skeleton className="h-4 w-16 rounded-md" />
      </div>
    </article>
  );
};

export default TimetableCardSkeleton;
