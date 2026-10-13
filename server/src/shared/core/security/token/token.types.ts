export interface AccessTokenPayload {
  sub: string;
  email: string;
  type: 'access';
}

export interface RefreshTokenPayload {
  sub: string;
  sid: string;
  email: string;
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
