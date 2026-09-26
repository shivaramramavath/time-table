import { BaseQueue } from '#shared/Base/BaseQueue.js';

export type UserJobAction = 'password:update';

export interface UpdatePasswordJob {
  userId: string;
  password: string;
}

export class UserQueue extends BaseQueue<UpdatePasswordJob> {
  constructor() {
    super('user');
  }

  async updatePassword(data: UpdatePasswordJob) {
    return this.add('user:password:update', data);
  }
}

export const userQueue = new UserQueue();
