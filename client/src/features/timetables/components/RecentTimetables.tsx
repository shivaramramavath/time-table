import { useTimetableMutation } from '@/features/timetables/hooks/timetable.query';
import RecentTimetableCard from './RecentTimetablesCard';
import { Badge } from '@/shared/ui/badge';

const RecentTimetables = () => {
  const { data = [], isLoading, isError } = useTimetableMutation.useGetRecentTimetables();

  if (isLoading) {
    return (
      <section className="space-y-3">
        <div className="text-sm text-muted-foreground">Loading recent timetables...</div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="space-y-3">
        <div className="text-sm text-destructive">Failed to load recent timetables.</div>
      </section>
    );
  }

  if (!data.length) {
    return (
      <section className="space-y-3">
        <div className="text-sm text-muted-foreground">No recent timetables.</div>
      </section>
    );
  }

  return (
    <section className="space-y-2 shrink-0">
      {/* Header */}
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">Recent Timetables</h2>

        <Badge variant="secondary">{data.length} recent</Badge>
      </div>

      {/* List */}
      <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto scrollbar">
        {data.map((timetable) => (
          <div key={timetable._id} className="shrink-0 snap-start p-1">
            <RecentTimetableCard timetable={timetable} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentTimetables;
