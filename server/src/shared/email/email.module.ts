import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { BrevoModule } from '../../infrastructure/email/brevo/brevo.module';
import { EMAIL_DELIVERY_QUEUE } from './email.constants';
import { EmailService } from './email.service';
import { EmailJobProcessor } from './queue/email-job.processor';
import { EmailJobPublisher } from './queue/email-job.publisher';
import { EmailTemplateRenderer } from './templates/email-template.renderer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: EMAIL_DELIVERY_QUEUE,
    }),
    BrevoModule,
  ],
  providers: [
    EmailService,
    EmailJobPublisher,
    EmailJobProcessor,
    EmailTemplateRenderer,
  ],
  exports: [EmailService],
})
export class EmailModule {}
