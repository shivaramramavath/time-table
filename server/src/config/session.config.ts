import { registerAs } from '@nestjs/config';

export const sessionConfig = registerAs('session', () => ({
  userSessionTtl: Number(process.env.USER_SESSION_TTL ?? 7 * 24 * 60 * 60), // 7 day
  sessionRecordTtl: Number(process.env.SESSION_RECORD_TTL ?? 30 * 24 * 60 * 60), // 30 days
}));
