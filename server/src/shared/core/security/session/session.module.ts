import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { sessionConfig } from '../../../../config';
import { SessionRecordCache } from './session-record.cache';
import { SessionService } from './session.service';
import { UserSessionsCache } from './user-sessions.cache';

@Module({
  imports: [ConfigModule.forFeature(sessionConfig)],
  providers: [SessionService, SessionRecordCache, UserSessionsCache],
  exports: [SessionService],
})
export class SessionModule {}
