import type { Feedback } from "./feedback.model.js";
import { FeedbackModel } from "./feedback.model.js";

export const feedbackRepository = {
  create: async (feedback: Feedback) => {
    return FeedbackModel.create(feedback);
  },

  findByUserId: async (userId: string) => {
    return FeedbackModel.find({
      userId,
    })
      .sort({ createdAt: -1 })
      .lean();
  },
};
