import z from 'zod';

export const timetableSchema = {
  create: z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(3).max(200),
  }),
};
