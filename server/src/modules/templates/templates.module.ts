import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TemplatesController } from './controllers/templates.controller';
import { Template, TemplateSchema } from './entities/template.entity';
import { QUEUE_NAMES } from './queue/queue.constants';
import { TemplateEventsListener } from './queue/template-events.listener';
import { TemplateQueueProcessor } from './queue/template-queue.processor';
import { TemplateQueueService } from './queue/template-queue.service';
import { TemplatesRepository } from './repository/templates.repository';
import { TemplatesService } from './services/templates.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Template.name, schema: TemplateSchema },
    ]),
    BullModule.registerQueue({
      name: QUEUE_NAMES.TEMPLATE,
    }),
  ],
  controllers: [TemplatesController],
  providers: [
    TemplatesService,
    TemplatesRepository,
    TemplateQueueService,
    TemplateEventsListener,
    TemplateQueueProcessor,
  ],
  exports: [TemplatesService],
})
export class TemplatesModule {}
