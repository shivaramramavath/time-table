import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import type { Queue } from 'bullmq';

import { EMAIL_QUEUE, EmailJobName } from '../email.constants';
import type {
  PasswordResetEmailData,
  SignupGreetingEmailData,
} from '../email.types';
import { EMAIL_JOB_OPTIONS } from './email.queue-options';

@Injectable()
export class EmailQueueService {
  constructor(
    @InjectQueue(EMAIL_QUEUE)
    private readonly queue: Queue,
  ) {}

  async enqueueSignupGreeting(data: SignupGreetingEmailData): Promise<void> {
    await this.queue
      .add(EmailJobName.SEND_SIGNUP_GREETING, data, {
        ...EMAIL_JOB_OPTIONS,
        jobId: `signup-greeting-${data.recipient.email}`,
      })
      .then(() => undefined);
  }

  async enqueuePasswordReset(data: PasswordResetEmailData): Promise<void> {
    await this.queue
      .add(EmailJobName.SEND_PASSWORD_RESET, data, EMAIL_JOB_OPTIONS)
      .then(() => undefined);
  }
}
