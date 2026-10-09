import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

import { EMAIL_QUEUE, EmailQueue } from './queue/email.queue';

import { BrevoService } from './brevo/brevo.service';
import { EmailService } from './email.service';
import { EmailProcessor } from './queue/email.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: EMAIL_QUEUE,
    }),
  ],

  providers: [BrevoService, EmailQueue, EmailProcessor, EmailService],

  exports: [EmailService],
})
export class EmailModule {}
