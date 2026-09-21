import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
