import { BrevoClient, BrevoError } from '@getbrevo/brevo';
import { Inject, Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

import { type ConfigType } from '@nestjs/config';
import { emailConfig } from '../../../config';
import type { EmailMessage } from '../email.types';

@Injectable()
export class BrevoService {
  private readonly client: BrevoClient;
  private readonly sender: {
    name: string;
    email: string;
  };

  constructor(
    @Inject(emailConfig.KEY)
    private readonly config: ConfigType<typeof emailConfig>,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(BrevoService.name);

    this.client = new BrevoClient({
      apiKey: this.config.apiKey,
      timeoutInSeconds: this.config.timeout,
      maxRetries: this.config.maxRetries,
    });

    this.sender = this.config.sender;
  }

  async sendEmail(options: EmailMessage): Promise<string | undefined> {
    const { recipient, subject, html } = options;

    try {
      const response = await this.client.transactionalEmails.sendTransacEmail({
        sender: this.sender,
        to: [recipient],
        subject,
        htmlContent: html,
      });

      this.logger.info(
        {
          messageId: response.messageId,
          recipientDomain: this.getEmailDomain(recipient.email),
        },
        'Transactional email accepted by Brevo',
      );

      return response.messageId;
    } catch (error: unknown) {
      if (error instanceof BrevoError) {
        this.logger.error(
          {
            statusCode: error.statusCode,
            recipientDomain: this.getEmailDomain(recipient.email),
            subject,
          },
          'Brevo rejected the transactional email request',
        );
      } else {
        this.logger.error(
          {
            errorName: error instanceof Error ? error.name : 'UnknownError',
            recipientDomain: this.getEmailDomain(recipient.email),
            subject,
          },
          'Unexpected transactional email error',
        );
      }

      // Rethrow so BullMQ can apply its retry policy.
      throw error;
    }
  }

  async sendBulkEmails(
    options: EmailMessage[],
  ): Promise<PromiseSettledResult<string | undefined>[]> {
    return Promise.allSettled(options.map((option) => this.sendEmail(option)));
  }

  private getEmailDomain(email: string): string {
    const separator = email.lastIndexOf('@');

    return separator >= 0 ? email.slice(separator + 1) : 'unknown';
  }
}
