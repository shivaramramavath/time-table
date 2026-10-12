import { Global, Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';
import { PasswordService } from './password.service';

@Global()
@Module({
  providers: [
    {
      provide: PasswordService,
      useClass: BcryptService,
    },
  ],
  exports: [PasswordService],
})
export class PasswordModule {}
