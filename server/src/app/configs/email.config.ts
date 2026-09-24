import { env } from './env.js';

export const emailConfigs = {
  email: env.EMAIL_ID,
  title: 'Time Table',
  apiKey: env.BREVO_API_KEY,
  originUrl: env.ORIGIN_URL,
  timeout: 10000,
  maxRetries: 3,
};
