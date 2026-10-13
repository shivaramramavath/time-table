import { Inject, Injectable } from '@nestjs/common';
import { sessionConfig } from '../../../../config';
import { RedisService } from '../../../../infrastructure/redis/redis.service';
import { BaseCacheObject } from '../../../cache/base-cache-object';
import { SessionRecord } from './session.types';

@Injectable()
export class SessionRecordCache extends BaseCacheObject {
  constructor(
    redisService: RedisService,
    @Inject(sessionConfig.KEY)
    private readonly config: ReturnType<typeof sessionConfig>,
  ) {
    super(redisService.getClient(), 'user:session', config.sessionRecordTtl);
  }

  async saveSession(session: SessionRecord): Promise<void> {
    const { sid, ...data } = session;

    await this.setObject(sid, data);
  }

  async findSession(sid: string): Promise<SessionRecord | null> {
    const data = await this.getObject<Omit<SessionRecord, 'sid'>>(sid);

    if (!data) return null;

    return { ...data, sid };
  }

  async deleteSession(sid: string): Promise<boolean> {
    return this.deleteObject(sid);
  }
}
