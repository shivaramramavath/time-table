import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import {
  appConfig,
  databaseConfig,
  emailConfig,
  jwtConfig,
  redisConfig,
  sessionConfig,
} from '../config';
import { envValidationSchema } from '../config/env.validation';
import { EmailModule } from '../infrastructure/email/email.module';
import { AppLoggerModule } from '../infrastructure/logger/logger.module';
import { RedisModule } from '../infrastructure/redis/redis.module';
import { AuthModule } from '../modules/auth/auth.module';
import { TimetableModule } from '../modules/timetable/timetable.module';
import { UserModule } from '../modules/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60_000,
          limit: 100,
        },
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        appConfig,
        databaseConfig,
        emailConfig,
        jwtConfig,
        redisConfig,
        sessionConfig,
      ],
      validationSchema: envValidationSchema,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('database.uri'),
      }),
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.getOrThrow<string>('redis.host'),
          port: configService.getOrThrow<number>('redis.port'),
        },
      }),
    }),
    AppLoggerModule,
    RedisModule,
    EmailModule,
    AuthModule,
    UserModule,
    TimetableModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppService,
  ],
})
export class AppModule {}
