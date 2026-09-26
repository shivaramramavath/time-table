import type { Feedback } from './feedback.model.js';
import type { FeedbackRepository } from './feedback.repository.js';
import type { QueueService } from '#services/queue.service.js';
import { BaseProcess } from '#shared/Base/BaseProcess.js';
import { Job } from 'bullmq';
import { CreateFeedbackJob } from './feedback.queue.js';

export class FeedbackProcessor extends BaseProcess<Feedback> {
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly queueService: QueueService,
  ) {
    super();
  }

  async execute(job: Job<CreateFeedbackJob>): Promise<void> {
    switch (job.name) {
      case 'feedback:create':
        this.create(job.data);
        break;

      default:
        throw new Error(`Unsupported feedback action: ${job.name}`);
    }
  }

  async create(feedback: Feedback) {
    await this.feedbackRepository.create(feedback);

    await this.queueService.feedback({
      rating: feedback.rating,
      message: feedback.message,
    });
  }
}
