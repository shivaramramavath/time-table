import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { emailConfig } from '../../config';
import { BrevoService } from './brevo/brevo.service';
import { EmailTemplateService } from './email-template.service';
import { EMAIL_QUEUE } from './email.constants';
import { EmailService } from './email.service';
import { EmailProcessor } from './processors/email.processor';
import { EmailQueueService } from './queue/email-queue.service';

@Module({
  imports: [
    ConfigModule.forFeature(emailConfig),
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
