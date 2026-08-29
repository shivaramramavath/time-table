import type { Feedback } from "./feedback.model.js";

import { feedbackRepository } from "./feedback.repository.js";

export const feedbackProcessor = {
  create: async (feedback: Feedback) => {
    await feedbackRepository.create(feedback);
  },
};
