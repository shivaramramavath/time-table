import { Injectable } from '@nestjs/common';
import { RedisService } from '../../../../infrastructure/redis/redis.service';
import { BaseCacheList } from '../../../../shared/cache/base-cache-list';

@Injectable()
export class UserSessionsCache extends BaseCacheList<string> {
  constructor(redisService: RedisService) {
    super(redisService.getClient(), 'user:sessions', 30 * 24 * 60 * 60);
  }

  async addSession(sub: string, sid: string): Promise<void> {
    const sessionIds = await this.getList(sub);

    if (sessionIds === null) {
      await this.setList(sub, [sid]);
      return;
    }

    if (!sessionIds.includes(sid)) {
      await this.addToList(sub, sid);
    }
  }

  async removeSession(sub: string, sid: string): Promise<void> {
    await this.removeFromList(sub, (item) => item === sid);
  }

  async getSessionIds(sub: string): Promise<string[]> {
    return (await this.getList(sub)) ?? [];
  }

  async deleteUserSessions(sub: string): Promise<boolean> {
    return this.deleteList(sub);
  }
}
