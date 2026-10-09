import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { BcryptService } from './services/password/bcrypt.service';
import { PasswordService } from './services/password/password.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from 'src/infrastructure/email/email.module';
import { UserModule } from '../user/user.module';
import { JwtTokenService } from './services/jwt/jwt.service';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    EmailModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('jwt.access.secret'),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService, PasswordService, JwtTokenService],
})
export class AuthModule {}
