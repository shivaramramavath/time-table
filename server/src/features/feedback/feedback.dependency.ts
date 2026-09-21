import redis from '#configs/redis.js';

import { FeedbackModel } from './feedback.model.js';
import { FeedbackQueue } from './feedback.queue.js';
import { FeedbackProcessor } from './feedback.processor.js';
import { FeedbackRepository } from './feedback.repository.js';
import { FeedbackWorker } from './feedback.worker.js';
import { FeedbackController } from './feedback.controller.js';
import { FeedbackService } from './feedback.service.js';
import { Queue } from 'bullmq';
import { queueService } from '#features/auth/auth.dependency.js';

// Repository
const feedbackRepository = new FeedbackRepository(FeedbackModel);

// Queue
const feedbackQueue = new FeedbackQueue(new Queue('feedback', { connection: redis }));

export const feedbackService = new FeedbackService(feedbackQueue);

// Processor
const feedbackProcessor = new FeedbackProcessor(feedbackRepository, queueService);

// Worker
export const feedbackWorker = new FeedbackWorker(feedbackProcessor, redis);


// Controller
export const feedbackController = new FeedbackController(feedbackService);
