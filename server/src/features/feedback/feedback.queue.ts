import type { Queue } from 'bullmq';

export interface CreateFeedbackJob {
  userId: string;
  message: string;
  rating: number;
}

export class FeedbackQueue {
  constructor(private readonly queue: Queue<CreateFeedbackJob>) {}

  async create(data: CreateFeedbackJob) {
    return this.queue.add('create', data);
  }
}
