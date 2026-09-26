import { BaseQueue } from '#shared/Base/BaseQueue.js';

export type TimetableJobAction = 'created' | 'updated' | 'deleted' | 'generate';

export interface TimetableJobData {
  timetableId: string;
  userId: string;
  action: TimetableJobAction;
}

export class TimetableQueue extends BaseQueue<TimetableJobData> {
  constructor() {
    super('timetable');
  }

  async create(data: Omit<TimetableJobData, 'action'>) {
    return this.add('timetable:create', {
      ...data,
      action: 'created',
    });
  }

  async update(data: Omit<TimetableJobData, 'action'>) {
    return this.add('timetable:update', {
      ...data,
      action: 'updated',
    });
  }

  async delete(data: Omit<TimetableJobData, 'action'>) {
    return this.add('timetable:delete', {
      ...data,
      action: 'deleted',
    });
  }

  async generate(data: Omit<TimetableJobData, 'action'>) {
    return this.add('timetable:generate', {
      ...data,
      action: 'generate',
    });
  }
}

export const timetableQueue = new TimetableQueue();
