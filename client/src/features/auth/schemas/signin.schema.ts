import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must not exceed 128 characters"),
});

export type SigninFormValues = z.infer<typeof signinSchema>;
