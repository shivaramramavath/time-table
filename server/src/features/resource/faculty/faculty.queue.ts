import { BaseQueue } from '#shared/Base/BaseQueue.js';

export interface FacultyJobData {
  facultyId: string;
}

export class FacultyQueue extends BaseQueue {
  constructor() {
    super('faculty');
  }

  async addFacultyJob(data: FacultyJobData) {
    return this.add(`faculty:create`, data);
  }
  async updateFacultyJob(data: FacultyJobData) {
    return this.add(`faculty:update`, data);
  }

  async deleteFacultyJob(data: FacultyJobData) {
    return this.add(`faculty:delete`, data);
  }
}

export const facultyQueue = new FacultyQueue();
