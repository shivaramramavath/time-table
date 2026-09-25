import { BaseCache } from '#shared/cache/BaseCache.js';

export class FacultyCache extends BaseCache {
  constructor() {
    super('faculty', 300);
  }
}

export const facultyCache = new FacultyCache();
