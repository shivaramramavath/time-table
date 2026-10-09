import { useUserStore } from '@/shared/user/user.store';
import React, { useEffect } from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const darkMode = useUserStore((state) => state.user?.preferences.darkMode);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return <>{children}</>;
};

export default ThemeProvider;
