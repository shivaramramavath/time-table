import type { Job } from 'bullmq';

import { BaseProcess } from '#shared/base/base-process.js';

import type { SubjectJobData } from './subject.queue.js';
import type { SubjectRepository } from './subject.repository.js';

export class SubjectProcess extends BaseProcess<SubjectJobData> {
  constructor(private readonly subjectRepository: SubjectRepository) {
    super();
  }

  async execute(job: Job<SubjectJobData>): Promise<unknown> {
    const { subjectId } = job.data;

    switch (job.name) {
      case 'subject:create':
        return this.handleCreated(subjectId);

      case 'subject:update':
        return this.handleUpdated(subjectId);

      case 'subject:delete':
        return this.handleDeleted(subjectId);

      default:
        throw new Error(`Unsupported subject action: ${job.name}`);
    }
  }

  private async handleCreated(subjectId: string) {
    const subject = await this.subjectRepository.findById(subjectId);

    if (!subject) {
      throw new Error(`Subject not found: ${subjectId}`);
    }

    // Subject created processing
  }

  private async handleUpdated(subjectId: string) {
    const subject = await this.subjectRepository.findById(subjectId);

    if (!subject) {
      throw new Error(`Subject not found: ${subjectId}`);
    }

    // Subject updated processing
  }

  private async handleDeleted(subjectId: string) {
    // Subject deleted processing
  }
}
