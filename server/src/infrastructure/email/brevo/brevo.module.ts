import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { emailConfig } from '../../../config';
import { BrevoService } from './brevo.service';

@Module({
  imports: [ConfigModule.forFeature(emailConfig)],
  providers: [BrevoService],
  exports: [BrevoService],
})
export class BrevoModule {}
