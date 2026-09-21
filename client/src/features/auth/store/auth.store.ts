import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  isCheckingAuth: boolean;

  setAuthenticated: () => void;
  setCheckingAuth: (value: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isCheckingAuth: true,

  setAuthenticated: () =>
    set({
      isAuthenticated: true,
      isCheckingAuth: false,
    }),

  setCheckingAuth: (isCheckingAuth) =>
    set({
      isCheckingAuth,
    }),

  clearAuth: () =>
    set({
      isAuthenticated: false,
      isCheckingAuth: false,
    }),
}));
