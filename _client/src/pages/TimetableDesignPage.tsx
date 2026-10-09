import { useParams } from 'react-router-dom';

import TimetableDesigner from '@/features/timetable-design/components/editor/TimetableDesigner';

const TimetableDesignPage = () => {
  const { timetableId } = useParams<{ timetableId: string }>();

  if (!timetableId) {
    return <div>Timetable ID is required.</div>;
  }

  return (
    <div>
      <TimetableDesigner timetableId={timetableId} />
    </div>
  );
};

export default TimetableDesignPage;
