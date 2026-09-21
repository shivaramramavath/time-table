import { createDesignerWorker } from '../shared/designer.worker.js';
import { roomProcessor } from './room.processor.js';

export const roomWorker = () => createDesignerWorker('room', roomProcessor);
