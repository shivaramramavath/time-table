import Joi from 'joi';

export const envValidationSchema = Joi.object({
  // Application
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),

  PORT: Joi.number().port().default(8080),

  ORIGIN_URL: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .default('http://localhost:3000'),

  // Database
  DATABASE_URL: Joi.string()
    .uri({ scheme: ['mongodb', 'mongodb+srv'] })
    .required(),

  // JWT
  JWT_ACCESS_SECRET: Joi.string().min(32).required(),
  JWT_ACCESS_EXPIRES_IN: Joi.string().default('15m'),

  JWT_REFRESH_SECRET: Joi.string().min(32).required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),

  JWT_PASSWORD_RESET_SECRET: Joi.string().min(32).required(),
  JWT_PASSWORD_RESET_EXPIRES_IN: Joi.string().default('15m'),

  // Session
  SESSION_TTL: Joi.number().integer().min(60).max(2592000).default(604800),

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
  LOG_ENABLED: Joi.boolean().truthy('true').falsy('false').default(true),
  LOG_LEVEL: Joi.string()
    .valid('fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent')
    .default('info'),
});
