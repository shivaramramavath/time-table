import { Module } from '@nestjs/common';
import { JwtTokenModule } from '../../modules/auth/services/jwt/jwt-token.module';
import { AuthenticateGuard } from './authenticate.guard';

@Module({
  imports: [JwtTokenModule],
  providers: [AuthenticateGuard],
  exports: [AuthenticateGuard],
})
export class GuardModule {}
