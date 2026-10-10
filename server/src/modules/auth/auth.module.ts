import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { BcryptService } from './services/password/bcrypt.service';
import { PasswordService } from './services/password/password.service';

import { ConfigModule } from '@nestjs/config';
import { EmailModule } from '../../infrastructure/email/email.module';
import { UserModule } from '../user/user.module';
import { CookieService } from './services/cookie/cookie.service';
import { JwtTokenModule } from './services/jwt/jwt-token.module';
import { SessionService } from './services/session/session.service';

@Module({
  imports: [UserModule, ConfigModule, EmailModule, JwtTokenModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    BcryptService,
    PasswordService,
    SessionService,
    CookieService,
  ],
})
export class AuthModule {}
