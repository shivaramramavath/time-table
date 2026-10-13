import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { BaseRepository } from '../../../shared/database/repositories/base.repository';
import { Feedback, FeedbackDocument } from '../entities/feedback.entity';

@Injectable()
export class FeedbackRepository extends BaseRepository<FeedbackDocument> {
  constructor(
    @InjectModel(Feedback.name)
    private readonly feedbackModel: Model<FeedbackDocument>,
  ) {
    super(feedbackModel);
  }

  async findByUserId(
    userId: string,
    skip = 0,
    limit = 20,
  ): Promise<FeedbackDocument[]> {
    return this.feedbackModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
}
