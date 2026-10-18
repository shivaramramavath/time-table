import { authApi } from "../api/auth.api";
import { Token } from "./token.service";

import { useUserStore } from "@/shared/user/user.store";
import { useAuthStore } from "../store/auth.store";

import type { User } from "@/shared/user/user.types";
import type { ForgotPasswordFormValues } from "../schemas/forgot-password.schema";
import type { ResetPasswordFormValues } from "../schemas/reset-password.schema";
import type { SigninFormValues } from "../schemas/signin.schema";
import type { SignupFormValues } from "../schemas/signup.schema";

type AuthResponse = {
  user: User;
  token: string;
  message?: string;
};

const setAuthenticatedUser = (user: User) => {
  useUserStore.getState().setUser(user);
  useAuthStore.getState().setAuthenticated();
};

const clearAuthentication = () => {
  useUserStore.getState().clearUser();
  useAuthStore.getState().clearAuth();
  Token.clearToken();
};

export const authService = {
  signup: async (data: SignupFormValues) => {
    const response = (await authApi.signup(data)) as AuthResponse;

    setAuthenticatedUser(response.user);
    Token.setToken(response.token);

    return response;
  },

  signin: async (data: SigninFormValues) => {
    const response = (await authApi.signin(data)) as AuthResponse;

    setAuthenticatedUser(response.user);
    Token.setToken(response.token);

    return response;
  },

  signout: async () => {
    try {
      return await authApi.signout();
    } finally {
      clearAuthentication();
    }
  },

  forgotPassword: async (data: ForgotPasswordFormValues) => {
    return await authApi.forgotPassword(data);
  },

  resetPassword: async (data: ResetPasswordFormValues, token: string) => {
    return await authApi.resetPassword(data, token);
  },
};
