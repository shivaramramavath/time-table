export type SessionStatus = 'active' | 'revoked' | 'compromised';
export type Role = 'user' | 'admin';

export interface SessionRecord {
  sid: string;
  sub: string;
  email: string;
  role: Role;
  status: SessionStatus;
  refreshTokenHash: string;
  createdAt: number;
  lastUsedAt: number;
  device?: {
    ip?: string;
    userAgent?: string;
    browser?: string;
    os?: string;
  };
}

export interface CreatedSessionProps {
  sub: string;
  email: string;
  role: Role;
  device?: SessionRecord['device'];
}

export interface CreatedSession {
  sid: string;
  sub: string;
  email: string;
  role: Role;
  secret: string;
}

export interface SessionIdentity {
  sid: string;
  sub: string;
  email: string;
  role: Role;
  status: SessionStatus;
  createdAt: number;
  lastUsedAt: number;
  device?: SessionRecord['device'];
}

export interface SessionForgotPassword {
  sid: string;
  sub: string;
  email: string;
  secret: string;
}
