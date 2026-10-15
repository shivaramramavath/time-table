import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import type { Job } from 'bullmq';
import { BrevoService } from '../../../infrastructure/email/brevo/brevo.service';
import { EmailTemplateRenderer } from '../email-template.renderer';
import { EMAIL_DELIVERY_QUEUE, EMAIL_JOB_TYPES } from '../email.constants';
import {
  FeedbackThankYouJob,
  PasswordResetJob,
  SignupGreetingJob,
} from '../email.types';

type EmailJobData = SignupGreetingJob | PasswordResetJob;

@Processor(EMAIL_DELIVERY_QUEUE, { concurrency: 5 })
@Injectable()
export class EmailJobProcessor extends WorkerHost {
  constructor(
    private readonly brevoService: BrevoService,
    private readonly emailTemplateService: EmailTemplateRenderer,
  ) {
    super();
  }

  async process(job: Job<EmailJobData>): Promise<unknown> {
    switch (job.name) {
      case EMAIL_JOB_TYPES.SEND_SIGNUP_GREETING:
        return this.sendSignupGreeting(job as Job<SignupGreetingJob>);

      case EMAIL_JOB_TYPES.SEND_PASSWORD_RESET:
        return this.sendPasswordReset(job as Job<PasswordResetJob>);

      case EMAIL_JOB_TYPES.SEND_FEEDBACK_THANK_YOU:
        return this.sendFeedbackThankYou(job as Job<FeedbackThankYouJob>);

      default:
        throw new Error(`Unsupported email job: ${job.name}`);
    }
  }

  private async sendSignupGreeting(job: Job<SignupGreetingJob>) {
    const { recipient, userName } = job.data;

    const htmlContent = this.emailTemplateService.renderSignupGreeting({
      userName,
      email: recipient.email,
    });

    return this.brevoService.sendEmail({
      recipient: {
        email: recipient.email,
        name: recipient.name,
      },
      subject: 'Welcome to our platform',
      htmlContent,
    });
  }

  private async sendPasswordReset(job: Job<PasswordResetJob>) {
    const { recipient, resetUrl } = job.data;

    const htmlContent = this.emailTemplateService.renderPasswordReset({
      resetUrl,
      userName: recipient.name ?? 'there',
    });

    return this.brevoService.sendEmail({
      recipient: {
        email: recipient.email,
        name: recipient.name,
      },
      subject: 'Reset your password',
      htmlContent,
    });
  }

  private async sendFeedbackThankYou(job: Job<FeedbackThankYouJob>) {
    const { recipient, userName, category, rating } = job.data;

    const htmlContent = this.emailTemplateService.renderFeedbackThankYou({
      userName,
      category,
      rating,
    });

    return this.brevoService.sendEmail({
      recipient: {
        email: recipient.email,
        name: recipient.name,
      },
      subject: 'Thanks for your feedback',
      htmlContent,
    });
  }
}
