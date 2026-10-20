import type { ReactNode } from "react";

import AuthProvider from "@/providers/AuthProvider";
import Navbar from "@/shared/components/navbar/Navbar";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background max-w-5xl mx-auto w-full px-2">
        <Navbar />

        <main>{children}</main>
      </div>
    </AuthProvider>
  );
}
