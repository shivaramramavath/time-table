import type { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

import type { FeedbackService } from './feedback.service.js';

export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  create = expressAsyncHandler(async (req: Request, res: Response) => {
    const { message, rating } = req.body;

    await this.feedbackService.create({
      userId: req.userId,
      message,
      rating,
    });

    res.status(201).json({
      success: true,
    });
  });
}
