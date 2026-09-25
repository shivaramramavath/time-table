import type { Job } from 'bullmq';

import type { FacultyJobData } from './faculty.queue.js';

export class FacultyProcess {
  async execute(job: Job<FacultyJobData>) {
    const { facultyId, action } = job.data;

    switch (action) {
      case 'created':
        return this.handleCreated(facultyId);

      case 'updated':
        return this.handleUpdated(facultyId);

      case 'deleted':
        return this.handleDeleted(facultyId);

      default:
        throw new Error(`Unsupported faculty action: ${action}`);
    }
  }

  private async handleCreated(facultyId: string) {
    return {
      facultyId,
      action: 'created',
    };
  }

  private async handleUpdated(facultyId: string) {
    return {
      facultyId,
      action: 'updated',
    };
  }

  private async handleDeleted(facultyId: string) {
    return {
      facultyId,
      action: 'deleted',
    };
  }
}
