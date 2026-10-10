import { Injectable } from '@nestjs/common';

import { RedisService } from '../../../infrastructure/redis/redis.service';
import { BaseCacheList } from '../../../shared/cache/base-cache-list';

export interface CachedTimetable {
  id: string;
  title: string;
  description: string;
  status: string;
}

@Injectable()
export class TimetableListCache extends BaseCacheList<CachedTimetable> {
  constructor(redisService: RedisService) {
    super(redisService.getClient(), 'cache:timetable-list', 300);
  }

  async getUserTimetables(userId: string) {
    return this.getList(userId);
  }

  async cacheUserTimetables(userId: string, timetables: CachedTimetable[]) {
    return this.setList(userId, timetables);
  }

  async invalidateUserTimetables(userId: string) {
    return this.deleteList(userId);
  }
}
