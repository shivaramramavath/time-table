import TimetableDesigner from '@/features/timetable-designer/components/editor/TimetableDesigner';
import { useSearchParams } from 'react-router-dom';

const TimetableDesignPage = () => {
  const [searchParams] = useSearchParams();

  const timetableId = searchParams.get('timetableId');

  return (
    <div>
      <TimetableDesigner timetableId={timetableId!} />
    </div>
  );
};

export default TimetableDesignPage;
