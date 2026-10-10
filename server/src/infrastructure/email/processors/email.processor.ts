import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import type { Job } from 'bullmq';

import { BrevoService } from '../brevo/brevo.service';
import { EMAIL_QUEUE, EmailJobName } from '../email.constants';
import type {
  PasswordResetEmailData,
  SignupGreetingEmailData,
} from '../email.types';
import { EmailTemplateService } from '../templates/email-template.service';

type EmailJobData = SignupGreetingEmailData | PasswordResetEmailData;

@Processor(EMAIL_QUEUE, { concurrency: 5 })
@Injectable()
export class EmailProcessor extends WorkerHost {
  constructor(
    private readonly brevoService: BrevoService,
    private readonly templates: EmailTemplateService,
  ) {
    super();
  }

  async process(job: Job<EmailJobData>): Promise<unknown> {
    switch (job.name) {
      case EmailJobName.SEND_SIGNUP_GREETING:
        return this.sendSignupGreeting(job as Job<SignupGreetingEmailData>);

      case EmailJobName.SEND_PASSWORD_RESET:
        return this.sendPasswordReset(job as Job<PasswordResetEmailData>);

      default:
        throw new Error(`Unsupported email job: ${job.name}`);
    }
  }

  private async sendSignupGreeting(job: Job<SignupGreetingEmailData>) {
    const { recipient, userName } = job.data;

    const html = this.templates.renderSignupGreeting({
      userName,
    });

    return this.brevoService.sendEmail({
      recipient: {
        email: recipient.email,
        name: recipient.name,
      },
      subject: 'Welcome to our platform',
      html,
    });
  }

  private async sendPasswordReset(job: Job<PasswordResetEmailData>) {
    const { recipient, resetUrl } = job.data;

    const html = this.templates.renderPasswordReset({
      resetUrl,
      userName: recipient.name ?? 'there',
    });

    return this.brevoService.sendEmail({
      recipient: {
        email: recipient.email,
        name: recipient.name,
      },
      subject: 'Reset your password',
      html,
    });
  }
}
