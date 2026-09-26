import { FeedbackProcessor } from './feedback.processor.js';
import { BaseWorker } from '#shared/Base/BaseWorker.js';
import { CreateFeedbackJob } from './feedback.queue.js';
import { queueService } from '#features/auth/auth.dependency.js';
import { feedbackRepository } from './feedback.dependency.js';

export class FeedbackWorker extends BaseWorker<CreateFeedbackJob> {
  constructor(private readonly feedbackProcessor: FeedbackProcessor) {
    super('feedback', feedbackProcessor);
  }
}

export const feedbackWorker = new FeedbackWorker(
  new FeedbackProcessor(feedbackRepository, queueService),
);
