import type { Job } from 'bullmq';

import { BaseWorker } from '#shared/queue/BaseWorker.js';

import type { FacultyJobData } from './faculty.queue.js';

import { FacultyProcess } from './faculty.process.js';

export class FacultyWorker extends BaseWorker<FacultyJobData> {
  private readonly processor = new FacultyProcess();

  constructor() {
    super('faculty', 5);
  }

  protected async process(job: Job<FacultyJobData>) {
    return this.processor.execute(job);
  }
}

export const facultyWorker = new FacultyWorker();
