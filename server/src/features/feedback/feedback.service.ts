import { Feedback } from "./feedback.model.js";
import { feedbackQueue } from "./feedback.queue.js";

export const feedbackService = {
  create: async ({ userId, message, rating }: Feedback) => {
    await feedbackQueue.create({ userId, message, rating });
  },
};
