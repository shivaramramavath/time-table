import { useParams } from 'react-router-dom';

const TimetableViewPage = () => {
  const { timetableId, sectionId } = useParams<{
    timetableId: string;
    sectionId: string;
  }>();

  return (
    <div>
      <h1>Timetable</h1>

      <p>Timetable: {timetableId}</p>
      <p>Section: {sectionId}</p>
    </div>
  );
};

export default TimetableViewPage;
