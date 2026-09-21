import { usePreferencesStore } from '../preferences/preferences.store';
import { useUserStore } from './user.store';

export const userService = {
  setUser: async (user) => {
    useUserStore.getState().setUser(user);

    usePreferencesStore.getState().setPreferences(user.preferences);
  },

  clearUser: () => {
    useUserStore.getState().clearUser();

    usePreferencesStore.getState().resetPreferences();
  },
};
