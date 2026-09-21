import type { Feedback } from './feedback.model.js';
import type { FeedbackRepository } from './feedback.repository.js';
import type { QueueService } from '#services/queue.service.js';

export class FeedbackProcessor {
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly queueService: QueueService,
  ) {}

  async create(feedback: Feedback) {
    await this.feedbackRepository.create(feedback);

    await this.queueService.feedback({
      rating: feedback.rating,
      message: feedback.message,
    });
  }
}
