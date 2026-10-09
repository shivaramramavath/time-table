import { BaseCache } from '#shared/base/base-cache.js';

export class RoomCache extends BaseCache {
  constructor() {
    super('room', 300);
  }
}

export const roomCache = new RoomCache();
