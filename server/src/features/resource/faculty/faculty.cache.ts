import { BaseCache } from '#shared/Base/BaseCache.js';

export class FacultyCache extends BaseCache {
  constructor() {
    super('faculty', 300);
  }
}

export const facultyCache = new FacultyCache();
