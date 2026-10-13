import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import type { Queue } from 'bullmq';

import { EMAIL_DELIVERY_QUEUE, EMAIL_JOB_TYPES } from '../email.constants';
import type {
  FeedbackThankYouJob,
  PasswordResetJob,
  SignupGreetingJob,
} from '../email.types';
import { EMAIL_JOB_DEFAULTS } from './email-job.defaults';

@Injectable()
export class EmailJobPublisher {
  constructor(
    @InjectQueue(EMAIL_DELIVERY_QUEUE)
    private readonly queue: Queue,
  ) {}

  async enqueueSignupGreeting(data: SignupGreetingJob): Promise<void> {
    await this.queue.add(EMAIL_JOB_TYPES.SEND_SIGNUP_GREETING, data, {
      ...EMAIL_JOB_DEFAULTS,
    });
  }

  async enqueuePasswordReset(data: PasswordResetJob): Promise<void> {
    await this.queue.add(EMAIL_JOB_TYPES.SEND_PASSWORD_RESET, data, {
      ...EMAIL_JOB_DEFAULTS,
    });
  }

  async enqueueFeedbackThankYou(data: FeedbackThankYouJob): Promise<void> {
    await this.queue.add(EMAIL_JOB_TYPES.SEND_FEEDBACK_THANK_YOU, data, {
      ...EMAIL_JOB_DEFAULTS,
    });
  }
}
