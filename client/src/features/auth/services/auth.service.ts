import { authApi } from '../api/auth.api';
import { useAuthStore } from '../store/auth.store';
import { Token } from './token.service';

import { useUserStore } from '@/shared/user/user.store';

import type {
  ForgotPasswordRequest,
  GoogleAuthRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from '../types/auth.types';
import type { User } from '@/shared/user/user.types';

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
  login: async (data: LoginRequest) => {
    const { data: response } = await authApi.login(data);

    setAuthenticatedUser(response.user);

    Token.setToken(response.token);

    return response;
  },

  register: async (data: RegisterRequest) => {
    const { data: response } = await authApi.register(data);

    setAuthenticatedUser(response.user);

    Token.setToken(response.token);

    return response;
  },

  googleLogin: async (data: GoogleAuthRequest) => {
    const { data: response } = await authApi.googleLogin(data);

    setAuthenticatedUser(response.user);

    Token.setToken(response.token);

    return response;
  },

  googleRegister: async (data: GoogleAuthRequest) => {
    const { data: response } = await authApi.googleRegister(data);

    setAuthenticatedUser(response.user);

    Token.setToken(response.token);

    return response;
  },

  checkAuth: async () => {
    useAuthStore.getState().setCheckingAuth(true);

    try {
      const { data: response } = await authApi.checkAuth();

      setAuthenticatedUser(response.user);

      return response;
    } catch (error) {
      clearAuthentication();

      throw error;
    } finally {
      useAuthStore.getState().setCheckingAuth(false);
    }
  },

  refreshToken: async () => {
    try {
      const { data: response } = await authApi.refreshToken();

      Token.setToken(response.token);

      return response;
    } catch {
      clearAuthentication();
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
    } finally {
      clearAuthentication();
    }
  },

  forgotPassword: async (data: ForgotPasswordRequest) => {
    const { data: response } = await authApi.forgotPassword(data);

    return response;
  },

  resetPassword: async (data: ResetPasswordRequest) => {
    const { data: response } = await authApi.resetPassword(data);

    return response;
  },
};
