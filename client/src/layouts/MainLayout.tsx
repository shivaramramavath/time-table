import { Outlet } from 'react-router-dom';
import Navbar from '@/shared/layouts/navbar/Navbar';

const MainLayout = () => {
  return (
    <div className="grid min-h-screen w-full grid-rows-[3.5rem_1fr]">
      <header>
        <Navbar />
      </header>
      <main className="group relative min-h-0 overflow-hidden border-t border-border/50 bg-surface-muted/5 backdrop-blur-sm">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/15 blur-3xl"
        />
        <div className="relative z-10 h-full overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
