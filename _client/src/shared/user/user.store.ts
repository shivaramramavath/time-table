import { create } from 'zustand';

import type { User } from './user.types';

interface UserState {
  user: User | null;

  setUser: (user: User) => void;
  updateUser: (user: Partial<User>) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,

  setUser: (user) =>
    set({
      user,
    }),

  updateUser: (updates) =>
    set((state) => {
      if (!state.user) {
        return state;
      }

      return {
        user: {
          ...state.user,
          ...updates,
        },
      };
    }),

  clearUser: () =>
    set({
      user: null,
    }),
}));
