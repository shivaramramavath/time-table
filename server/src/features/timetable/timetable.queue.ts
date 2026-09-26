import { BaseQueue } from '#shared/Base/BaseQueue.js';

export interface TimetableJobData {
  timetableId: string;
  userId: string;
}

export class TimetableQueue extends BaseQueue<TimetableJobData> {
  constructor() {
    super('timetable');
  }

  async create(data: TimetableJobData) {
    return this.add('timetable:create', {
      ...data,
    });
  }

  async update(data: TimetableJobData) {
    return this.add('timetable:update', {
      ...data,
    });
  }

  async delete(data: TimetableJobData) {
    return this.add('timetable:delete', {
      ...data,
    });
  }

  async generate(data: TimetableJobData) {
    return this.add('timetable:generate', {
      ...data,
    });
  }
}

export const timetableQueue = new TimetableQueue();
