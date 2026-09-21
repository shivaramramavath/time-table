import type { Room } from './room.model.js';

import { roomQueue } from './room.queue.js';
import { roomRepository } from './room.repository.js';
import { createDesignerCache } from '../shared/designer-cache.js';

export const roomCache = createDesignerCache<Room>({
  resource: 'rooms',
  repository: roomRepository,
  queue: roomQueue,
});
