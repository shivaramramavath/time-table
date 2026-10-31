import { z } from "zod";

export const feedbackSchema = z.object({
  message: z
    .string()
    .trim()
    .min(3, "Feedback must contain at least 3 characters.")
    .max(2000, "Feedback cannot exceed 2000 characters."),

  rating: z
    .number()
    .int("Rating must be a whole number.")
    .min(1, "Please select a rating.")
    .max(5, "Rating cannot exceed 5."),

  category: z.enum([
    "general",
    "bug",
    "feature-request",
    "ui-ux",
    "performance",
    "other",
  ]),
});

export type FeedbackFormValues = z.infer<typeof feedbackSchema>;
