import { Injectable } from '@nestjs/common';
import { SignUpGreeting } from './email.types';
import { EmailQueue } from './queue/email.queue';

@Injectable()
export class EmailService {
  constructor(private readonly emailQueue: EmailQueue) {}

  async signUpGreeting(data: SignUpGreeting) {
    await this.emailQueue.send(data);
  }
}
