import { Injectable } from '@nestjs/common';

import type {
  FeedbackThankYouJob,
  PasswordResetJob,
  SignupGreetingJob,
} from './email.types';
import { EmailJobPublisher } from './queue/email-job.publisher';

@Injectable()
export class EmailService {
  constructor(private readonly emailJobPublisher: EmailJobPublisher) {}

  async sendSignupGreeting(data: SignupGreetingJob): Promise<void> {
    await this.emailJobPublisher.enqueueSignupGreeting(data);
  }

  async sendPasswordReset(data: PasswordResetJob): Promise<void> {
    await this.emailJobPublisher.enqueuePasswordReset(data);
  }

  async sendFeedbackThankYou(data: FeedbackThankYouJob): Promise<void> {
    await this.emailJobPublisher.enqueueFeedbackThankYou(data);
  }
}
