import { createDesignerQueue } from '../shared/designer.queue.js';
import type { Room } from './room.model.js';

export const roomQueue = createDesignerQueue<Room>({
  name: 'room',
});
