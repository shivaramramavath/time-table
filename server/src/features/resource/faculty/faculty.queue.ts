import { BaseQueue } from '#shared/queue/BaseQueue.js';

export interface FacultyJobData {
  facultyId: string;
  action: 'created' | 'updated' | 'deleted';
}

export class FacultyQueue extends BaseQueue {
  constructor() {
    super('faculty');
  }

  async addFacultyJob(data: FacultyJobData) {
    return this.add(`faculty:${data.action}`, data);
  }
}

export const facultyQueue = new FacultyQueue();
