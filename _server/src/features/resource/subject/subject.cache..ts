import { BaseCache } from '#shared/base/base-cache.js';

export class SubjectCache extends BaseCache {
  constructor() {
    super('subject', 300);
  }
}

export const subjectCache = new SubjectCache();
