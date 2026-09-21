import type { Feedback, FeedbackModel } from './feedback.model.js';

export class FeedbackRepository {
  constructor(private readonly feedbackModel: FeedbackModel) {}

  async create(feedback: Feedback) {
    return this.feedbackModel.create(feedback);
  }

  async findByUserId(userId: string) {
    return this.feedbackModel.find({ userId }).sort({ createdAt: -1 }).lean();
  }
}
