import { BaseWorker } from '#shared/Base/BaseWorker.js';

import type { UpdatePasswordJob } from './user.queue.js';
import { UserProcess } from './user.process.js';

export class UserWorker extends BaseWorker<UpdatePasswordJob> {
  constructor(userProcess: UserProcess, concurrency = 5) {
    super('user', userProcess, concurrency);
  }
}

export const userWorker = new UserWorker(new UserProcess());
