import { queueService } from '#features/auth/auth.dependency.js';
import type { Feedback } from './feedback.model.js';

import { feedbackRepository } from './feedback.repository.js';

export const feedbackProcessor = {
  create: async (feedback: Feedback) => {
    await feedbackRepository.create(feedback);
    await queueService.feedback(feedback);
  },
};
