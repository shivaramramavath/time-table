import { Injectable, Logger } from '@nestjs/common';
import handlebars, { TemplateDelegate } from 'handlebars';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  FeedbackThankYouTemplateData,
  ResetPasswordTemplateData,
  SignupTemplateData,
} from './templates.type';

@Injectable()
export class EmailTemplateRenderer {
  private readonly logger = new Logger(EmailTemplateRenderer.name);

  private readonly signupTemplate: TemplateDelegate<SignupTemplateData>;
  private readonly resetPasswordTemplate: TemplateDelegate<ResetPasswordTemplateData>;
  private readonly feedbackThankYouTemplate: TemplateDelegate<FeedbackThankYouTemplateData>;

  constructor() {
    this.signupTemplate = this.loadHandlebarsTemplate<SignupTemplateData>(
      'signup.template.hbs',
    );

    this.resetPasswordTemplate =
      this.loadHandlebarsTemplate<ResetPasswordTemplateData>(
        'reset-password.template.hbs',
      );

    this.feedbackThankYouTemplate =
      this.loadHandlebarsTemplate<FeedbackThankYouTemplateData>(
        'feedback-thank-you.template.hbs',
      );
  }

  renderSignupGreeting(data: SignupTemplateData): string {
    return this.signupTemplate(data);
  }

  renderPasswordReset(data: ResetPasswordTemplateData): string {
    return this.resetPasswordTemplate(data);
  }

  renderFeedbackThankYou(data: FeedbackThankYouTemplateData): string {
    return this.feedbackThankYouTemplate(data);
  }

  private loadHandlebarsTemplate<T extends object>(
    fileName: string,
  ): TemplateDelegate<T> {
    const filePath = join(__dirname, 'templates', fileName);

    try {
      const source = readFileSync(filePath, 'utf-8');

      return handlebars.compile<T>(source, {
        strict: true,
      });
    } catch (error) {
      this.logger.error(
        `Failed to load template "${fileName}" from "${filePath}"`,
        error instanceof Error ? error.stack : String(error),
      );

      throw error;
    }
  }
}
