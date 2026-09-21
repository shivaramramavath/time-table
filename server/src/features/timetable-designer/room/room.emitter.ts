import type { Room } from './room.model.js';

import { createDesignerEmitter } from '../shared/designer.emitter.js';

export const roomEmitter = createDesignerEmitter<Room>('room');
