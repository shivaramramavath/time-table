import React, { useEffect } from 'react';

import { usePreferencesStore } from '@/shared/preferences/preferences.store';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const darkMode = usePreferencesStore((state) => state.darkMode);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return <>{children}</>;
};

export default ThemeProvider;
