
import { FeedbackModel } from './feedback.model.js';
import { FeedbackQueue } from './feedback.queue.js';
import { FeedbackRepository } from './feedback.repository.js';
import { FeedbackController } from './feedback.controller.js';
import { FeedbackService } from './feedback.service.js';

// Repository
export const feedbackRepository = new FeedbackRepository(FeedbackModel);

// Queue
const feedbackQueue = new FeedbackQueue();

export const feedbackService = new FeedbackService(feedbackQueue);

// Controller
export const feedbackController = new FeedbackController(feedbackService);
