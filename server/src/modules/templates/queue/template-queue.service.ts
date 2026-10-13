import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bullmq';

import { QUEUE_NAMES, TEMPLATE_JOB_NAMES } from './queue.constants';
import { TEMPLATE_JOB_OPTIONS } from './template.queue-options';

export interface CreateTemplateJobData {
  userId: string;
  templateId: string;
}

export interface RemoveTemplateJobData {
  templateId: string;
  userId: string;
}

@Injectable()
export class TemplateQueueService {
  constructor(
    @InjectQueue(QUEUE_NAMES.TEMPLATE)
    private readonly templateQueue: Queue,
  ) {}

  async enqueueCreate(
    data: CreateTemplateJobData,
  ): Promise<Job<CreateTemplateJobData>> {
    return await this.templateQueue.add(TEMPLATE_JOB_NAMES.CREATE, data, {
      ...TEMPLATE_JOB_OPTIONS,
      jobId: `create-${data.userId}-${Date.now()}`,
    });
  }

  async enqueueRemove(
    data: RemoveTemplateJobData,
  ): Promise<Job<RemoveTemplateJobData>> {
    return await this.templateQueue.add(TEMPLATE_JOB_NAMES.REMOVE, data, {
      ...TEMPLATE_JOB_OPTIONS,
      jobId: `remove-${data.templateId}-${Date.now()}`,
    });
  }
}
