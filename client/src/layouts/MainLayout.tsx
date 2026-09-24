import { Outlet } from 'react-router-dom';

import Navbar from '@/shared/layouts/navbar/Navbar';

const MainLayout = () => {
  return (
    <div className="grid h-screen w-full grid-rows-[3.5rem_minmax(0,1fr)]">
      <header className="relative z-50">
        <Navbar />
      </header>

      <main className="relative min-h-0 overflow-hidden border-t border-border/50 bg-surface-muted/5 pt-2 backdrop-blur-sm">
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 size-50 rounded-full bg-blue-500/15 blur-3xl"
        />

        {/* Page content */}
        <div className="relative z-10 h-full min-h-0 overflow-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
