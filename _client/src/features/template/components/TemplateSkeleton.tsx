import { Skeleton } from '@/shared/ui/skeleton';

const TemplateSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-xl border">
      <Skeleton className="h-36 rounded-none" />

      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>

        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
};

export default TemplateSkeleton;
