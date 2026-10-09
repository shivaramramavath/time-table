import { Injectable } from '@nestjs/common';

import { BcryptService } from './bcrypt.service';

@Injectable()
export class PasswordService {
  constructor(private readonly bcryptService: BcryptService) {}

  async hash(password: string): Promise<string> {
    return this.bcryptService.hash(password);
  }

  async verify(password: string, hash: string): Promise<boolean> {
    return this.bcryptService.compare(password, hash);
  }
}
