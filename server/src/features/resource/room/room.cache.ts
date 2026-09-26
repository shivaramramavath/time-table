import { BaseCache } from '#shared/Base/BaseCache.js';

export class RoomCache extends BaseCache {
  constructor() {
    super('room', 300);
  }
}

export const roomCache = new RoomCache();
