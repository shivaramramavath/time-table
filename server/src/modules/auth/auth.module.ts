import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CookieModule } from '../../shared/core/security/cookie/cookie.module';
import { PasswordModule } from '../../shared/core/security/password/password.module';
import { SessionModule } from '../../shared/core/security/session/session.module';
import { EmailModule } from '../../shared/email/email.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    EmailModule,
    PasswordModule,
    CookieModule,
    SessionModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
