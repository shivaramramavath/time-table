import { Injectable } from '@nestjs/common';

import type {
  PasswordResetEmailData,
  SignupGreetingEmailData,
} from './email.types';
import { EmailQueueService } from './queue/email-queue.service';

@Injectable()
export class EmailService {
  constructor(private readonly emailQueue: EmailQueueService) {}

  async sendSignupGreeting(data: SignupGreetingEmailData): Promise<void> {
    await this.emailQueue.enqueueSignupGreeting(data);
  }

  async sendPasswordReset(data: PasswordResetEmailData): Promise<void> {
    await this.emailQueue.enqueuePasswordReset(data);
  }
}
