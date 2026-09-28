import { userApi } from './user.api';
import { useUserStore } from './user.store';
import type { User } from './user.types';

export const userService = {
  setUser: async (user: User) => {
    useUserStore.getState().setUser(user);
  },

  clearUser: () => {
    useUserStore.getState().clearUser();
  },

  updateUser: async (user: Partial<User>) => {
    await userApi.updateCurrentUser(user);
  },
};
