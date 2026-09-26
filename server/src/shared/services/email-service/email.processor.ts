import loadHtml from '#utils/loadHtml.js';
import { BrevoService } from '../../../infrastructure/email/brevo.js';

import type { ForgotPasswordJob, RegisterGreetingJob, FeedbackJob } from './email.queue.js';

export class EmailProcessor {
  constructor(
    private readonly brevoService: BrevoService,
    private readonly originUrl: string,
    private readonly senderEmail: string,
  ) {}

  async forgotPassword(data: ForgotPasswordJob) {
    const { email, token } = data;

    const resetUrl = `${this.originUrl}/reset-password?token=${encodeURIComponent(token)}`;

    const html = await loadHtml('email.forgot-password.ejs', {
      resetUrl,
    });

    return this.brevoService.sendEmail({
      toEmail: email,
      subject: 'Password Reset',
      htmlContent: html,
    });
  }

  async registerGreeting(data: RegisterGreetingJob) {
    const { email, userName } = data;

    const html = await loadHtml('email.register-greeting.ejs', {
      userName,
      email,
    });

    return this.brevoService.sendEmail({
      toEmail: email,
      toName: userName,
      subject: 'Welcome to Time Table',
      htmlContent: html,
    });
  }

  async feedback(data: FeedbackJob) {
    const html = await loadHtml('email.feedback.ejs', data);

    return this.brevoService.sendEmail({
      toEmail: this.senderEmail,
      subject: 'Feedback',
      htmlContent: html,
    });
  }
}
