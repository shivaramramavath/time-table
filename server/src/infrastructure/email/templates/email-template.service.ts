import { Injectable } from '@nestjs/common';
import Handlebars from 'handlebars';

@Injectable()
export class EmailTemplateService {
  private readonly signupTemplate = Handlebars.compile(`
    <main style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h1>Welcome, {{userName}}!</h1>
      <p>Your account has been created successfully.</p>
      <p>We're glad you're here.</p>
    </main>
  `);

  private readonly passwordResetTemplate = Handlebars.compile(`
    <main style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h1>Password reset</h1>
      <p>Hello {{userName}},</p>
      <p>We received a request to reset your password.</p>
      <p>
        <a href="{{resetUrl}}">Reset your password</a>
      </p>
      <p>If you did not request this, you can ignore this email.</p>
    </main>
  `);

  renderSignupGreeting(data: { userName: string }): string {
    return this.signupTemplate(data);
  }

  renderPasswordReset(data: { userName: string; resetUrl: string }): string {
    return this.passwordResetTemplate(data);
  }
}
