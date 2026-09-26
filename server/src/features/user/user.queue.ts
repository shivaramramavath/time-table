import { BaseQueue } from '#shared/Base/BaseQueue.js';
import { User } from './user.model.js';

export type UserJobAction = 'password:update';

export interface UpdateJob {
  userId: string;
  data: Partial<User>;
}

export class UserQueue extends BaseQueue<UpdateJob> {
  constructor() {
    super('user');
  }

  async updatePassword(data: UpdateJob) {
    return this.add('user:update', data);
  }
}

export const userQueue = new UserQueue();
