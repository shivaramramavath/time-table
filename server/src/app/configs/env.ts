import "dotenv/config";

import { cleanEnv, email, port, str } from "envalid";

export const env = cleanEnv(process.env, {
  // Application
  PORT: port({
    default: 8080,
    desc: "Port on which the Node.js server runs",
    example: "8080",
  }),

  NODE_ENV: str({
    choices: ["development", "test", "production"],
    default: "development",
    desc: "Application environment",
    example: "development",
  }),

  ORIGIN_URL: str({
    desc: "Frontend URL allowed to access the backend",
    example: "http://localhost:3000",
  }),

  // Email
  EMAIL_ID: email({
    desc: "Email address used by the application to send emails",
    example: "admin@example.com",
  }),

  BREVO_API_KEY: str({
    desc: "API key used to authenticate with the Brevo email service",
    example: "xkeysib-xxxxxxxxxxxxxxxxxxxxxxxx",
  }),

  // AI
  GROQ_API_KEY: str({
    desc: "API key used to authenticate with the Groq API",
    example: "gsk_xxxxxxxxxxxxxxxxxxxxxxxx",
  }),

  // Authentication
  JWT_SECRET_KEY: str({
    desc: "Secret key used to sign and verify JWT tokens",
    example: "your-super-secret-jwt-key-at-least-32-chars",
  }),

  // Redis
  REDIS_HOST: str({
    desc: "Hostname or IP address of the Redis server",
    example: "localhost",
  }),

  REDIS_PORT: port({
    default: 6379,
    desc: "Port on which the Redis server is running",
    example: "6379",
  }),

  // MongoDB
  MONGODB_URI: str({
    desc: "MongoDB connection URI used by the application",
    example: "mongodb://localhost:27017/my_database",
  }),
});
