import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function StatsLoading() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index}>
          <CardContent className="flex items-center justify-between p-5">
            <div className="space-y-3">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-7 w-16" />
            </div>
            <Skeleton className="size-11 rounded-lg" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
