import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import { EMAIL_JOB_SEND, EMAIL_QUEUE } from './email.queue';

import { BrevoService } from '../brevo/brevo.service';
import type { SignUpGreeting } from '../email.types';

@Processor(EMAIL_QUEUE, {
  concurrency: 5,
})
export class EmailProcessor extends WorkerHost {
  constructor(private readonly brevoService: BrevoService) {
    super();
  }

  async process(job: Job<SignUpGreeting>) {
    switch (job.name) {
      case EMAIL_JOB_SEND:
        return this.sendEmail(job.data);

      default:
        throw new Error(`Unknown email job: ${job.name}`);
    }
  }

  private async sendEmail(data: SignUpGreeting) {
    // TODO: add load html template
    return this.brevoService.sendEmail({
      toEmail: data.toEmail,
      toName: data.toName,
      subject: 'Sign up greeting',
      htmlContent: '<h1>Sign up greeting</h1>',
    });
  }
}
