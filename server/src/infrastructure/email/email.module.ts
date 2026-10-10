import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

import { BrevoService } from './brevo/brevo.service';
import { EMAIL_QUEUE } from './email.constants';
import { EmailService } from './email.service';
import { EmailProcessor } from './processors/email.processor';
import { EmailQueueService } from './queue/email-queue.service';
import { EmailTemplateService } from './templates/email-template.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: EMAIL_QUEUE,
    }),
  ],
  providers: [
    BrevoService,
    EmailService,
    EmailQueueService,
    EmailProcessor,
    EmailTemplateService,
  ],
  exports: [EmailService],
})
export class EmailModule {}
