import type { ReactNode } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { env } from '../config/env';

interface GoogleProviderProps {
  children: ReactNode;
}

export function GoogleProvider({ children }: GoogleProviderProps) {
  return <GoogleOAuthProvider clientId={env.googleClientId}>{children}</GoogleOAuthProvider>;
}
