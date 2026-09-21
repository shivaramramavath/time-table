import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '@/features/auth/store/auth.store';

const PublicRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/timetables" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
