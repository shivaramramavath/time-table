import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import { EMAIL_JOB_SEND, EMAIL_QUEUE } from './email.queue';

import { BrevoService } from '../brevo/brevo.service';
import type { SendEmailOptions } from '../email.types';

@Processor(EMAIL_QUEUE, {
  concurrency: 5,
})
export class EmailProcessor extends WorkerHost {
  constructor(private readonly brevoService: BrevoService) {
    super();
  }

  async process(job: Job<SendEmailOptions>) {
    switch (job.name) {
      case EMAIL_JOB_SEND:
        return this.brevoService.sendEmail(job.data);

      default:
        throw new Error(`Unknown email job: ${job.name}`);
    }
  }
}
