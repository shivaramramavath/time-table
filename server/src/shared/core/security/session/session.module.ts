import { Module } from '@nestjs/common';
import { SessionRecordCache } from './session-record.cache';
import { SessionService } from './session.service';
import { UserSessionsCache } from './user-sessions.cache';

@Module({
  providers: [SessionService, SessionRecordCache, UserSessionsCache],
  exports: [SessionService],
})
export class SessionModule {}
