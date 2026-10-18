import { userApi } from "./user.api";
import { useUserStore } from "./user.store";
import type { User } from "./user.types";

export const userService = {
  setUser: (user: User): void => {
    useUserStore.getState().setUser(user);
  },

  getUser: (): User | null => {
    return useUserStore.getState().user;
  },

  clearUser: (): void => {
    useUserStore.getState().clearUser();
  },

  updateUser: async (updates: Partial<User>): Promise<User> => {
    const updatedUser = await userApi.updateCurrentUser(updates);

    useUserStore.getState().setUser(updatedUser);

    return updatedUser;
  },
};
