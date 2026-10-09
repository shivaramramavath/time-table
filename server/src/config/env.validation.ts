import Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),

  PORT: Joi.number().port().default(3000),

  DATABASE_URL: Joi.string().uri().required(),

  // JWT
  JWT_ACCESS_SECRET: Joi.string().min(32).required(),

  JWT_ACCESS_EXPIRES_IN: Joi.string().default('15m'),

  JWT_REFRESH_SECRET: Joi.string().min(32).required(),

  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),

  // Redis
  REDIS_HOST: Joi.string().hostname().default('localhost'),

  REDIS_PORT: Joi.number().port().default(6379),

  // Brevo
  BREVO_API_KEY: Joi.string().required(),

  BREVO_SENDER_EMAIL: Joi.string().email().required(),

  BREVO_SENDER_NAME: Joi.string().min(1).max(100).required(),

  BREVO_TIMEOUT: Joi.number().integer().min(1).max(60).default(10),

  BREVO_MAX_RETRIES: Joi.number().integer().min(0).max(10).default(3),

  // Logging
  LOG_LEVEL: Joi.string()
    .valid('fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent')
    .default('info'),
});
