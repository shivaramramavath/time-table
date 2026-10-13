import { Injectable } from '@nestjs/common';
import {
  feedbackThankYouTemplate,
  type FeedbackThankYouTemplateData,
} from './feedback-thank-you.template';
import {
  resetPasswordTemplate,
  type ResetPasswordTemplateData,
} from './reset-password.template';
import { signupTemplate, type SignupTemplateData } from './signup.template';

@Injectable()
export class EmailTemplateRenderer {
  renderSignupGreeting(data: SignupTemplateData): string {
    return signupTemplate(data);
  }

  renderPasswordReset(data: ResetPasswordTemplateData): string {
    return resetPasswordTemplate(data);
  }

  renderFeedbackThankYou(data: FeedbackThankYouTemplateData): string {
    return feedbackThankYouTemplate(data);
  }
}
