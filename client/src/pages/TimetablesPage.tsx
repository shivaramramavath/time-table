import RecentTimetables from '@/features/timetables/components/RecentTimetables';
import Timetables from '@/features/timetables/components/Timetables';

const TimetablesPage = () => {
  return (
    <div className="px-6 space-y-6 max-w-6xl mx-auto">
      <RecentTimetables />
      <Timetables />
    </div>
  );
};

export default TimetablesPage;
