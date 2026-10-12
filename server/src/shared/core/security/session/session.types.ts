export type SessionStatus = 'active' | 'revoked' | 'compromised';

export interface SessionRecord {
  sid: string;
  sub: string;
  email: string;
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

export interface CreatedSession {
  sid: string;
  sub: string;
  email: string;
  secret: string;
}

export interface SessionIdentity {
  sid: string;
  sub: string;
  email: string;
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
