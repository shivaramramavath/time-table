import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import { authService } from "@/features/auth/services/auth.service";
import { Token } from "@/features/auth/services/token.service";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { userService } from "@/shared/user/user.service";
import { httpClient } from "./http-client";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<unknown> | null = null;

const clearAuthentication = () => {
  Token.clearToken();
  userService.clearUser();
  useAuthStore.getState().clearAuth();
};

const redirectToSignin = () => {
  if (typeof window === "undefined") return;
  if (window.location.pathname === "/signin") return;

  const redirect = encodeURIComponent(
    window.location.pathname + window.location.search,
  );

  window.location.replace(`/signin?redirect=${redirect}`);
};

const isExcludedFromRefresh = (url: string) =>
  url.includes("/auth/refresh") ||
  url.includes("/auth/signin") ||
  url.includes("/auth/signup");

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = Token.getToken();

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  } else {
    config.headers.delete("Authorization");
  }

  return config;
};

export const errorInterceptor = async (
  error: AxiosError<{ message?: string }>,
) => {
  const originalRequest = error.config as RetryableRequestConfig | undefined;

  const status = error.response?.status;
  const requestUrl = originalRequest?.url ?? "";

  // No request config: this may be a network error.
  if (!originalRequest) {
    return Promise.reject(error);
  }

  // Handle expired/invalid access tokens.
  if (
    status === 401 &&
    !originalRequest._retry &&
    !isExcludedFromRefresh(requestUrl)
  ) {
    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = authService.refreshToken();
      }

      await refreshPromise;

      const accessToken = Token.getToken();

      if (!accessToken) {
        throw new Error("Refresh completed without providing an access token.");
      }

      originalRequest.headers.set("Authorization", `Bearer ${accessToken}`);

      return await httpClient(originalRequest);
    } catch (refreshError) {
      const refreshStatus = axios.isAxiosError(refreshError)
        ? refreshError.response?.status
        : undefined;

      // Only a definitive refresh-session rejection proves that
      // the user must authenticate again.
      if (refreshStatus === 401 || refreshStatus === 403) {
        clearAuthentication();
        redirectToSignin();
      }

      return Promise.reject(refreshError);
    } finally {
      refreshPromise = null;
    }
  }

  // Convert the error into a readable message without logging
  // request headers, cookies, passwords, or tokens.
  const message =
    error.response?.data?.message ??
    (status === 429
      ? "Too many requests. Please try again later."
      : error.code === "ECONNABORTED"
        ? "The request timed out."
        : !error.response
          ? "Unable to connect to the server."
          : error.message || "Something went wrong.");

  if (process.env.NODE_ENV === "development") {
    console.error(`[API ${status ?? "NETWORK ERROR"}] ${message}`);
  }

  return Promise.reject(error);
};
