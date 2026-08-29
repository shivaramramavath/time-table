import { Outlet } from "react-router-dom";
import Navbar from "@/shared/layouts/navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen w-full">
      <Navbar />

      <main className="min-h-[calc(100vh-4.25rem)] pt-17">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
