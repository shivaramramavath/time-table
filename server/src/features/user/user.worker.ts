import { BaseWorker } from '#shared/Base/BaseWorker.js';

import type { UpdateJob } from './user.queue.js';
import { UserProcess } from './user.process.js';

export class UserWorker extends BaseWorker<UpdateJob> {
  constructor(userProcess: UserProcess, concurrency = 3) {
    super('user', userProcess, concurrency);
  }
}

export const userWorker = new UserWorker(new UserProcess());
