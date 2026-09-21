import * as z from 'zod';

export const authSchema = {
  register: z.object({
    userName: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(6).max(20),
  }),

  login: z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20),
  }),

  forgotPassword: z.object({
    email: z.string().email(),
  }),

  resetPassword: z.object({
    password: z.string().min(6).max(20),
    token: z.string(),
  }),

  refresh: z.object({
    refreshToken: z.string(),
  }),
};
