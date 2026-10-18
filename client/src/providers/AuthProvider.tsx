"use client";

import { useEffect, type ReactNode } from "react";

import { useAuthStore } from "@/features/auth/store/auth.store";

// import LoadingHeader from "@/shared/components/LoadingHeader";

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  useEffect(() => {
    let active = true;

    const restoreSession = async () => {
      try {
        // await authService.refreshToken();
        // await authService.checkAuth();
      } catch {
        // No valid session or the server is unavailable.
        // The service should handle authentication state.
      } finally {
        if (active) {
          useAuthStore.getState().setCheckingAuth(false);
        }
      }
    };

    void restoreSession();

    return () => {
      active = false;
    };
  }, []);

  if (isCheckingAuth) {
    return <div>Loading auth</div>;
  }

  return <>{children}</>;
}
