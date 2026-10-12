import { Module } from '@nestjs/common';
import { AuthenticateGuard } from './authenticate.guard';

@Module({
  providers: [AuthenticateGuard],
  exports: [AuthenticateGuard],
})
export class GuardModule {}
