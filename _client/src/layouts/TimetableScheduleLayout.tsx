import { Outlet } from 'react-router-dom';

import TimetableSidebar from '../features/timetable-schedule/components/sidebar/ScheduleSidebarItem';

const TimetableViewLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <TimetableSidebar />

      <main className="min-w-0 flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default TimetableViewLayout;
