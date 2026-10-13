import {
  OnQueueEvent,
  QueueEventsHost,
  QueueEventsListener,
} from '@nestjs/bullmq';
import { PinoLogger } from 'nestjs-pino';

import { QUEUE_NAMES } from './queue.constants';

@QueueEventsListener(QUEUE_NAMES.TEMPLATE)
export class TemplateEventsListener extends QueueEventsHost {
  constructor(private readonly logger: PinoLogger) {
    super();
    this.logger.setContext(TemplateEventsListener.name);
  }

  @OnQueueEvent('completed')
  onCompleted(event: { jobId: string; returnvalue: string }): void {
    this.logger.info({ jobId: event.jobId }, 'Template job completed');

    // todo extract the data
  }
}
