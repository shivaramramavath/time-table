import type { Feedback } from './feedback.model.js';
import type { FeedbackQueue } from './feedback.queue.js';

export class FeedbackService {
  constructor(private readonly feedbackQueue: FeedbackQueue) {}

  async create({ userId, message, rating }: Feedback) {
    await this.feedbackQueue.create({
      userId,
      message,
      rating,
    });
  }
}
