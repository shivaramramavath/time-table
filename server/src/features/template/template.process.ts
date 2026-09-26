import type { Job } from 'bullmq';

import { BaseProcess } from '#shared/Base/BaseProcess.js';

import type { TemplateJobData } from './template.queue.js';
import type { TemplateRepository } from './template.repository.js';

export class TemplateProcess extends BaseProcess<TemplateJobData> {
  constructor(private readonly templateRepository: TemplateRepository) {
    super();
  }

  async execute(job: Job<TemplateJobData>): Promise<void> {
    switch (job.name) {
      case 'template:create':
        await this.create(job.data);
        break;

      case 'template:update':
        await this.update(job.data);
        break;

      case 'template:delete':
        await this.delete(job.data);
        break;

      default:
        throw new Error(`Unsupported template job: ${job.name}`);
    }
  }

  private async create(data: TemplateJobData): Promise<void> {
    const template = await this.templateRepository.get(data.templateId);

    if (!template) {
      throw new Error(`Template not found: ${data.templateId}`);
    }

    // Template create processing
    // Example:
    // indexing, cache invalidation, notifications, etc.
  }

  private async update(data: TemplateJobData): Promise<void> {
    const template = await this.templateRepository.get(data.templateId);

    if (!template) {
      throw new Error(`Template not found: ${data.templateId}`);
    }

    // Template update processing
  }

  private async delete(data: TemplateJobData): Promise<void> {
    // Template delete processing
    // Example:
    // remove cache, remove search index, cleanup resources
  }
}
