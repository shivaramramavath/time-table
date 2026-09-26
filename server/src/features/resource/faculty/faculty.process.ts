import type { Job } from 'bullmq';

import { BaseProcess } from '#shared/Base/BaseProcess.js';

import type { FacultyJobData } from './faculty.queue.js';
import type { FacultyRepository } from './faculty.repository.js';

export class FacultyProcess extends BaseProcess<FacultyJobData> {
  constructor(private readonly facultyRepository: FacultyRepository) {
    super();
  }

  async execute(job: Job<FacultyJobData>): Promise<unknown> {
    const { facultyId } = job.data;

    switch (job.name) {
      case 'faculty:create':
        return this.handleCreated(facultyId);

      case 'faculty:update':
        return this.handleUpdated(facultyId);

      case 'faculty:delete':
        return this.handleDeleted(facultyId);

      default:
        throw new Error(`Unsupported faculty action: ${job.name}`);
    }
  }

  private async handleCreated(facultyId: string) {
    const faculty = await this.facultyRepository.findById(facultyId);

    if (!faculty) {
      throw new Error(`Faculty not found: ${facultyId}`);
    }

    // Faculty created processing
  }

  private async handleUpdated(facultyId: string) {
    const faculty = await this.facultyRepository.findById(facultyId);

    if (!faculty) {
      throw new Error(`Faculty not found: ${facultyId}`);
    }

    // Faculty updated processing
  }

  private async handleDeleted(facultyId: string) {
    // Faculty deleted processing
  }
}
