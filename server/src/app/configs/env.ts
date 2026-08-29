import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(8080),

  NODE_ENV: z.enum(["development", "production"]).default("development"),

  ORIGIN_URL: z.string().min(1, "ORIGIN is required"),

  BREVO_API_KEY: z.string().min(1, "BREVO_API_KEY is required"),

  GROQ_API_KEY: z.string().min(1, "GROQ_API_KEY is required"),

  JWT_SECRET_KEY: z.string().min(1, "JWT_SECRET_KEY is required"),

  REDIS_HOST: z.string().min(1, "REDIS_HOST is required"),
  REDIS_PORT: z.coerce.number(),

  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables");
  console.error(parsed.error.message);
  process.exit(1);
}

const env = {
  ...parsed.data,
  isProd: parsed.data.NODE_ENV === "production",
};

export default env;
