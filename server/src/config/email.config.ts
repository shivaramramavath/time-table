import { registerAs } from '@nestjs/config';

export const emailConfig = registerAs('email', () => ({
  apiKey: process.env.BREVO_API_KEY ?? '',
  sender: {
    email: process.env.BREVO_SENDER_EMAIL ?? '',
    name: process.env.BREVO_SENDER_NAME ?? '',
  },
  timeout: Number(process.env.BREVO_TIMEOUT ?? 10),
  maxRetries: Number(process.env.BREVO_MAX_RETRIES ?? 3),
}));
