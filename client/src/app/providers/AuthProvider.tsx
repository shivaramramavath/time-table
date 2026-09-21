import React, { useEffect } from 'react';

import { useAuthStore } from '@/features/auth/store/auth.store';
import { authService } from '@/features/auth/services/auth.service';

import LoadingHeader from '../../shared/components/LoadingHeader';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  useEffect(() => {
    authService.checkAuth();
  }, []);

  if (isCheckingAuth) {
    return <LoadingHeader />;
  }

  return <>{children}</>;
};

export default AuthProvider;
