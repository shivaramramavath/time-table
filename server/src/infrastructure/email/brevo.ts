import { BrevoClient, BrevoError } from '@getbrevo/brevo';

import logger from '#configs/logger.js';
import { emailConfigs } from '#configs/email.config.js';

export interface SendEmailOptions {
  toEmail: string;
  toName?: string;
  subject: string;
  htmlContent: string;
}

export class BrevoService {
  constructor(
    private readonly client: BrevoClient,
    private readonly senderEmail: string,
    private readonly senderName: string,
  ) {}

  async sendEmail({ toEmail, toName, subject, htmlContent }: SendEmailOptions): Promise<string> {
    try {
      const response = await this.client.transactionalEmails.sendTransacEmail({
        sender: {
          name: this.senderName,
          email: this.senderEmail,
        },

        to: [
          {
            email: toEmail,
            name: toName,
          },
        ],

        subject,
        htmlContent,
      });

      logger.info(`Email sent: ${response.messageId}`);

      return response.messageId ?? '';
    } catch (error) {
      if (error instanceof BrevoError) {
        logger.error(`Brevo error ${error.statusCode}: ${error.message}`);

        logger.error(error.body);
      } else {
        logger.error('Unknown Brevo email error', error);
      }

      throw error;
    }
  }

  async sendBulkEmail(
    subject: string,
    htmlContent: string,
    options: Pick<SendEmailOptions, 'toEmail' | 'toName'>[],
  ): Promise<string[]> {
    try {
      const response = await this.client.transactionalEmails.sendTransacEmail({
        sender: {
          name: this.senderName,
          email: this.senderEmail,
        },

        to: options.map(({ toEmail, toName }) => ({
          email: toEmail,
          name: toName,
        })),

        subject,
        htmlContent,
      });

      return response.messageIds ?? [];
    } catch (error) {
      if (error instanceof BrevoError) {
        logger.error(`Brevo error ${error.statusCode}: ${error.message}`);

        logger.error(error.body);
      } else {
        logger.error('Unknown Brevo email error', error);
      }

      throw error;
    }
  }

  async sendBulkEmails(options: SendEmailOptions[]): Promise<string[]> {
    return Promise.all(options.map((option) => this.sendEmail(option)));
  }
}

const brevoClient = new BrevoClient({
  apiKey: emailConfigs.apiKey,
  timeoutInSeconds: emailConfigs.timeout,
  maxRetries: emailConfigs.maxRetries,
});

export const brevoService = new BrevoService(brevoClient, emailConfigs.email, emailConfigs.title);
