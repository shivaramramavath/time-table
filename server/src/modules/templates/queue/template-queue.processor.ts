import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import { QUEUE_NAMES, TEMPLATE_JOB_NAMES } from './queue.constants';
import {
  CreateTemplateJobData,
  RemoveTemplateJobData,
} from './template-queue.service';

@Processor(QUEUE_NAMES.TEMPLATE)
export class TemplateQueueProcessor extends WorkerHost {
  constructor() {
    super();
  }

  async process(job: Job): Promise<unknown> {
    switch (job.name) {
      case TEMPLATE_JOB_NAMES.CREATE:
        return this.createTemplate(job as Job<CreateTemplateJobData>);

      case TEMPLATE_JOB_NAMES.REMOVE:
        return this.removeTemplate(job as Job<RemoveTemplateJobData>);

      default:
        throw new Error(`Unsupported template job: ${job.name}`);
    }
  }

  private async createTemplate(job: Job<CreateTemplateJobData>) {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log('create template', job.data);
        resolve(true);
      }, 1000);
    });
  }

  private async removeTemplate(job: Job<RemoveTemplateJobData>) {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log('remove template', job.data);
        resolve(true);
      }, 1000);
    });
  }
}
