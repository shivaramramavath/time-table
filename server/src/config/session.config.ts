import { registerAs } from '@nestjs/config';

export const sessionConfig = registerAs('session', () => ({
  ttl: Number(process.env.SESSION_TTL ?? 604800),
}));
