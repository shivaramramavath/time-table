import { BaseCache } from '#shared/base/base-cache.js';

export class FacultyCache extends BaseCache {
  constructor() {
    super('faculty', 300);
  }
}

export const facultyCache = new FacultyCache();
