import { BaseCache } from '#shared/Base/BaseCache.js';

export class SubjectCache extends BaseCache {
  constructor() {
    super('subject', 300);
  }
}

export const subjectCache = new SubjectCache();
