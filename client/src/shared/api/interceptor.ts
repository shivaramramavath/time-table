import type { AxiosError, InternalAxiosRequestConfig } from "axios";

import { toast } from "sonner";

import { Token } from "@/features/auth/services/token.service";
import { authService } from "@/features/auth/services/auth.service";
import { httpClient } from "./httpClient";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { navigationService } from "../services/navigation.service";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = Token.getToken();

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
};

export const errorInterceptor = async (
  error: AxiosError<{ message?: string }>,
) => {
  const originalRequest = error.config as RetryableRequestConfig | undefined;

  const status = error.response?.status;

  const isRefreshRequest = originalRequest?.url?.includes("/auth/refresh");

  if (
    status === 403 &&
    originalRequest &&
    !originalRequest._retry &&
    !isRefreshRequest
  ) {
    originalRequest._retry = true;

    try {
      await authService.refreshToken();

      return httpClient(originalRequest);
    } catch {
     
      navigationService.navigate("/login");

      return Promise.reject(error);
    }
  }

  const message =
    error.response?.data?.message ?? error.message ?? "Something went wrong";

  console.error(message);

  return Promise.reject(error);
};
