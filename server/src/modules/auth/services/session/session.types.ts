export type SessionStatus = 'active' | 'revoked' | 'compromised';

export interface SessionRecord {
  sid: string;
  sub: string;
  email: string;
  status: SessionStatus;
  refreshTokenHash: string;
  createdAt: number;
  lastUsedAt: number;
  expiresAt: number;
  device?: {
    ip?: string;
    userAgent?: string;
    browser?: string;
    os?: string;
  };
}

export interface CreatedSession {
  sid: string;
  sub: string;
  email: string;
  secret: string;
  expiresIn: number;
}

export interface SessionIdentity {
  sid: string;
  sub: string;
  email: string;
  status: SessionStatus;
  createdAt: number;
  lastUsedAt: number;
  expiresAt: number;
  device?: SessionRecord['device'];
}

export interface SessionForgotPassword {
  sid: string;
  sub: string;
  email: string;
  secret: string;
  expiresIn: number;
}
