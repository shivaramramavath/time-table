import { BaseQueue } from '#shared/Base/BaseQueue.js';

export type TemplateJobAction = 'created' | 'updated' | 'deleted';

export interface TemplateJobData {
  templateId: string;
  userId: string;
  action: TemplateJobAction;
}

export class TemplateQueue extends BaseQueue<TemplateJobData> {
  constructor() {
    super('template');
  }

  async create(data: Omit<TemplateJobData, 'action'>) {
    return this.add('template:create', {
      ...data,
      action: 'created',
    });
  }

  async update(data: Omit<TemplateJobData, 'action'>) {
    return this.add('template:update', {
      ...data,
      action: 'updated',
    });
  }

  async delete(data: Omit<TemplateJobData, 'action'>) {
    return this.add('template:delete', {
      ...data,
      action: 'deleted',
    });
  }
}

export const templateQueue = new TemplateQueue();
