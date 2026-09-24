import RecentTimetables from '@/features/timetables/components/RecentTimetables';
import Timetables from '@/features/timetables/components/Timetables';

const TimetablesPage = () => {
  return (
    <div className="flex h-full min-h-0 flex-col gap-6 px-4">
      <RecentTimetables />

      <Timetables />
    </div>
  );
};

export default TimetablesPage;
