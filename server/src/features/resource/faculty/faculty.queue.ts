import { BaseQueue } from '#shared/base/base-queue.js';

export interface FacultyJobData {
  facultyId: string;
}

export class FacultyQueue extends BaseQueue<FacultyJobData> {
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
