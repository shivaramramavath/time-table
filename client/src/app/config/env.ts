import { z } from 'zod';

const envSchema = z.object({
  VITE_BACKEND_URL: z.string().url(),
  VITE_GOOGLE_CLIENT_ID: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:');

  throw new Error('Invalid environment variables');
}

export const env = {
  backendUrl: parsedEnv.data.VITE_BACKEND_URL,
  googleClientId: parsedEnv.data.VITE_GOOGLE_CLIENT_ID,
} as const;
