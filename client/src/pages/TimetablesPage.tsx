import RecentTimetables from '@/features/timetables/components/RecentTimetables';
import Timetables from '@/features/timetables/components/Timetables';

const TimetablesPage = () => {
  return (
    <div className="mx-auto flex h-full min-h-0 max-w-6xl flex-col gap-6 px-4">
      <RecentTimetables />

      <Timetables />
    </div>
  );
};

export default TimetablesPage;
