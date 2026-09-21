import type { z } from 'zod';

import { authSchema } from '../schemas/auth.schema.js';

export type RegisterDto = z.infer<typeof authSchema.register>;
export type LoginDto = z.infer<typeof authSchema.login>;
export type ForgotPasswordDto = z.infer<typeof authSchema.forgotPassword>;
export type ResetPasswordDto = z.infer<typeof authSchema.resetPassword>;
export type RefreshDto = z.infer<typeof authSchema.refresh>;

export type AccessToken = {
  sub: string;
};

export type RefreshToken = string;

export type Session = {
  userId: string;
  refreshTokenHash: string;
  status: 'active' | 'expired';
  createdAt: Date;
  updatedAt: Date;
};
