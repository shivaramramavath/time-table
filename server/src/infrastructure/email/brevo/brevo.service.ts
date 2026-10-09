import { BrevoClient, BrevoError } from '@getbrevo/brevo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';

import type { SendEmailOptions } from '../email.types';

@Injectable()
export class BrevoService {
  private readonly client: BrevoClient;

  constructor(
    private readonly logger: PinoLogger,
    private readonly configService: ConfigService,
  ) {
    this.logger.setContext(BrevoService.name);

    this.client = new BrevoClient({
      apiKey: this.configService.getOrThrow<string>('email.apiKey'),

      timeoutInSeconds: this.configService.getOrThrow<number>('email.timeout'),

      maxRetries: this.configService.getOrThrow<number>('email.maxRetries'),
    });
  }

  async sendEmail({
    toEmail,
    toName,
    subject,
    htmlContent,
  }: SendEmailOptions): Promise<string> {
    try {
      const response = await this.client.transactionalEmails.sendTransacEmail({
        sender: {
          name: this.configService.getOrThrow<string>('email.sender.name'),
          email: this.configService.getOrThrow<string>('email.sender.email'),
        },

        to: [
          {
            email: toEmail,
            ...(toName && { name: toName }),
          },
        ],

        subject,
        htmlContent,
      });

      this.logger.info(
        { messageId: response.messageId, toEmail },
        'Email sent successfully',
      );

      return response.messageId ?? '';
    } catch (error) {
      if (error instanceof BrevoError) {
        this.logger.error(
          {
            statusCode: error.statusCode,
            errorBody: error.body,
            toEmail,
          },
          `Brevo error: ${error.message}`,
        );
      } else {
        this.logger.error({ error, toEmail }, 'Unknown Brevo email error');
      }

      throw error;
    }
  }

  async sendBulkEmails(options: SendEmailOptions[]): Promise<string[]> {
    return Promise.all(options.map((option) => this.sendEmail(option)));
  }
}
