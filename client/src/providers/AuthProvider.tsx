"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { authService } from "@/features/auth/services/auth.service";
import { Token } from "@/features/auth/services/token.service";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { userService } from "@/shared/user/user.service";

type Props = {
  children: ReactNode;
};

let restorePromise: Promise<void> | null = null;

function restoreSession(): Promise<void> {
  if (!restorePromise) {
    restorePromise = (async () => {
      // Restore the in-memory access token using the refresh cookie.
      await authService.refreshToken();

      if (!Token.getToken()) {
        throw new Error("Access token was not restored.");
      }

      // The access token is now available for this request.
      await userService.getCurrentUser();
    })().finally(() => {
      restorePromise = null;
    });
  }

  return restorePromise;
}

function clearAuthentication() {
  Token.clearToken();
  userService.clearUser();
  useAuthStore.getState().clearAuth();
}

export default function AuthProvider({ children }: Props) {
  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  const [restoreError, setRestoreError] = useState(false);

  useEffect(() => {
    let active = true;

    const initialize = async () => {
      try {
        await restoreSession();

        if (!active) return;

        useAuthStore.getState().setAuthenticated();
        setRestoreError(false);
      } catch (error) {
        if (!active) return;

        const status = axios.isAxiosError(error)
          ? error.response?.status
          : undefined;

        if (status === 401 || status === 403) {
          clearAuthentication();
          router.replace("/signin");
          return;
        }

        // Network errors and server failures don't prove the
        // refresh session is invalid.
        useAuthStore.getState().setCheckingAuth(false);
        setRestoreError(true);
      }
    };

    void initialize();

    return () => {
      active = false;
    };
  }, [router]);

  if (isCheckingAuth || (!isAuthenticated && !restoreError)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Restoring your session...
        </p>
      </div>
    );
  }

  if (restoreError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <p className="text-sm text-muted-foreground">
          Unable to verify your session.
        </p>

        <button
          type="button"
          className="rounded-md border px-4 py-2 text-sm"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return children;
}
