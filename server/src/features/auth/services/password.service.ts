import crypto from 'node:crypto';
import argon from 'argon2';

export class PasswordService {
  async hash(password: string): Promise<string> {
    return argon.hash(password);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return argon.verify(password, hashedPassword);
  }

  generatePassword(length = 16): string {
    return crypto.randomBytes(length).toString('base64url').slice(0, length);
  }
}
