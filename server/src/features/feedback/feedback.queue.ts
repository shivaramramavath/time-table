import { BaseQueue } from '#shared/Base/BaseQueue.js';

export interface CreateFeedbackJob {
  userId: string;
  message: string;
  rating: number;
}

export class FeedbackQueue extends BaseQueue<CreateFeedbackJob> {
  constructor() {
    super('feedback');
  }

  async create(data: CreateFeedbackJob) {
    return this.add('feedback:create', data);
  }
}

export const feedbackQueue = new FeedbackQueue();
