import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryFilter, Types } from 'mongoose';
import { EmailService } from '../../../shared/email/email.service';
import { CreateFeedbackDto } from '../dto/create-feedback.dto';
import { FindFeedbackQueryDto } from '../dto/find-feedback-query.dto';
import { FeedbackDocument } from '../entities/feedback.entity';
import { FeedbackRepository } from '../repository/feedback.repository';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly emailService: EmailService,
  ) {}

  async create(userId: string, dto: CreateFeedbackDto) {
    const feedback = await this.feedbackRepository.create({
      ...dto,
      userId: new Types.ObjectId(userId),
    });

    await this.emailService.sendFeedbackThankYou({
      userName: 'unknown',
      category: dto.category,
      rating: dto.rating,
      recipient: {
        email: 'ramavathshiva6300@gmail.com',
        name: 'change the name',
      },
    });

    return feedback;
  }

  async findMyFeedbacks(userId: string, page = 1, limit = 20) {
    return this.feedbackRepository.findByUserId(
      userId,
      (page - 1) * limit,
      limit,
    );
  }

  async findOne(feedbackId: string) {
    const feedback = await this.feedbackRepository.findById(feedbackId);

    if (!feedback) {
      throw new NotFoundException('Feedback not found');
    }

    return feedback;
  }

  async findMany(query: FindFeedbackQueryDto) {
    const { rating, category, status } = query;

    const filter: QueryFilter<FeedbackDocument> = {};

    if (rating !== undefined) filter.rating = rating;
    if (category !== undefined) filter.category = category;
    if (status !== undefined) filter.status = status;
    return this.feedbackRepository.findMany(filter);
  }

  async remove(feedbackId: string) {
    const deleted = await this.feedbackRepository.deleteById(feedbackId);

    if (!deleted) {
      throw new NotFoundException('Feedback not found');
    }

    return { success: true, message: 'Feedback deleted successfully' };
  }
}
