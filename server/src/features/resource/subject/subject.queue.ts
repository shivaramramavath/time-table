import { BaseQueue } from '#shared/Base/BaseQueue.js';

export interface SubjectJobData {
  subjectId: string;
}

export class SubjectQueue extends BaseQueue<SubjectJobData> {
  constructor() {
    super('subject');
  }

  async addSubjectJob(data: SubjectJobData) {
    return this.add('subject:create', data);
  }

  async updateSubjectJob(data: SubjectJobData) {
    return this.add('subject:update', data);
  }

  async deleteSubjectJob(data: SubjectJobData) {
    return this.add('subject:delete', data);
  }
}

export const subjectQueue = new SubjectQueue();
