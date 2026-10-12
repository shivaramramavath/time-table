import { createHash, randomBytes } from 'node:crypto';

export function generateSessionId(): string {
  return randomBytes(16).toString('base64url');
}

export function generateSessionSecret(): string {
  return randomBytes(32).toString('base64url');
}

export function hashSessionSecret(secret: string): string {
  return createHash('sha256').update(secret).digest('hex');
}

export function parseRefreshToken(
  token: string,
): { sid: string; secret: string } | null {
  if (typeof token !== 'string') {
    return null;
  }

  const separator = token.indexOf('.');

  if (separator <= 0 || separator !== token.lastIndexOf('.')) {
    return null;
  }

  const sid = token.slice(0, separator);
  const secret = token.slice(separator + 1);

  if (!/^[A-Za-z0-9_-]{22}$/.test(sid) || !/^[A-Za-z0-9_-]{43}$/.test(secret)) {
    return null;
  }

  return { sid, secret };
}
