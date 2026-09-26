import { BaseWorker } from '#shared/Base/BaseWorker.js';

import type { MessageJobData } from './message.process.js';
import { messageProcessor } from './message.process.js';

class MessageWorker extends BaseWorker<MessageJobData> {
  constructor() {
    super('message', messageProcessor, 10);
  }
}

export const messageWorker = new MessageWorker();
