export type Role = 'user' | 'admin';

export interface AccessTokenPayload {
  sub: string;
  email: string;
  role: Role;
  type: 'access';
}

export interface RefreshTokenPayload {
  sub: string;
  sid: string;
  email: string;
  role: Role;
  secret: string;
  type: 'refresh';
}

export interface PasswordResetTokenPayload {
  sub: string;
  jti: string;
  type: 'password-reset';
}

export type TokenPayload =
  AccessTokenPayload | RefreshTokenPayload | PasswordResetTokenPayload;
