import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useTimetableMutation } from '@/features/timetables/hooks/timetable.query';

import TimetableCard from './TimetableCard';
import TimetableCardSkeleton from './TimetableCardSkeleton';

interface TimetableListProps {
  query: string;
  filters: {
    department: string;
    academicYear: string;
    stage: string;
    sort: string;
  };
}

const TimetableList = ({ query, filters }: TimetableListProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useTimetableMutation.useGetTimetables(query);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '200px',
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const timetables = data?.pages.flat() ?? [];

  if (status === 'pending') {
    return (
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <TimetableCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="py-10 text-center text-sm text-destructive">Error fetching timetables.</div>
    );
  }

  if (!timetables.length) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">No timetables found.</div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pr-1 scrollbar">
      <div className="space-y-4">
        {/* Cards */}
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {timetables.map((timetable) => (
            <TimetableCard key={timetable._id} timetable={timetable} />
          ))}
        </div>

        {/* Infinite Scroll */}
        <div ref={ref} className="py-4">
          {isFetchingNextPage && (
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <TimetableCardSkeleton key={index} />
              ))}
            </div>
          )}

          {!hasNextPage && (
            <div className="text-center text-xs text-muted-foreground">No more timetables</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimetableList;
