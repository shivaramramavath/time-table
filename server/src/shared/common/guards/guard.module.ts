import { Module } from '@nestjs/common';
import { AuthenticateGuard } from './authenticate.guard';
import { RolesGuard } from './roles.guard';

@Module({
  providers: [AuthenticateGuard, RolesGuard],
  exports: [AuthenticateGuard, RolesGuard],
})
export class GuardModule {}
