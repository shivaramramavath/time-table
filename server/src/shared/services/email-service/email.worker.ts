import { BaseWorker } from '#shared/Base/BaseWorker.js';

import { env } from '#configs/env.js';

import { EmailProcess } from './email.process.js';
import type { EmailJobData } from './email.queue.js';
import { EmailProcessor } from './email.processor.js';

import { brevoService } from '../../../infrastructure/email/brevo.js';

const emailProcessor = new EmailProcessor(brevoService, env.ORIGIN_URL, env.EMAIL_ID);

export class EmailWorker extends BaseWorker<EmailJobData> {
  constructor(emailProcess: EmailProcess, concurrency = 10) {
    super('email', emailProcess, concurrency);
  }
}

export const emailWorker = new EmailWorker(new EmailProcess(emailProcessor));
