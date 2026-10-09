import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import databaseConfig from './config/database.config';
import emailConfig from './config/email.config';
import { envValidationSchema } from './config/env.validation';
import jwtConfig from './config/jwt.config';
import redisConfig from './config/redis.config';
import { EmailModule } from './infrastructure/email/email.module';
import { AppLoggerModule } from './infrastructure/logger/logger.module';
import { RedisModule } from './infrastructure/redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [databaseConfig, emailConfig, jwtConfig, redisConfig],
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
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
