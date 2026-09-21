import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PreferencesState {
  darkMode: boolean;

  setDarkMode: (value: boolean) => void;
  toggleDarkMode: () => void;

  setPreferences: (preferences: Partial<Pick<PreferencesState, 'darkMode'>>) => void;

  resetPreferences: () => void;
}

const initialState: Pick<PreferencesState, 'darkMode'> = {
  darkMode: false,
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      ...initialState,

      setDarkMode: (darkMode) =>
        set({
          darkMode,
        }),

      toggleDarkMode: () =>
        set((state) => ({
          darkMode: !state.darkMode,
        })),

      setPreferences: (preferences) =>
        set((state) => ({
          ...state,
          ...preferences,
        })),

      resetPreferences: () =>
        set({
          ...initialState,
        }),
    }),
    {
      name: 'preferences',
    },
  ),
);
