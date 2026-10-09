import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { loggerConfig } from './logger.config';

@Module({
  imports: [LoggerModule.forRoot(loggerConfig)],

  exports: [LoggerModule],
})
export class AppLoggerModule {}
