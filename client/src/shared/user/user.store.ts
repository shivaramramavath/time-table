import { create } from "zustand";

import type { User, UserPreferences } from "./user.types";

interface UserState {
  user: User | null;

  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  updateUser: (updates) =>
    set((state) => {
      if (!state.user) return state;

      return {
        user: {
          ...state.user,
          ...updates,
          preferences: {
            ...state.user.preferences,
            ...updates.preferences,
          },
        },
      };
    }),

  updatePreferences: (updates) =>
    set((state) => {
      if (!state.user) return state;

      return {
        user: {
          ...state.user,
          preferences: {
            ...state.user.preferences,
            ...updates,
          },
        },
      };
    }),

  clearUser: () => set({ user: null }),
}));
