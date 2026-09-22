import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';

export class PasswordService {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  generatePassword(length = 16): string {
    return crypto.randomBytes(length).toString('base64url').slice(0, length);
  }
}
