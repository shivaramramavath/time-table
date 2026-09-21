import { env } from '#configs/env.js';
import { BrevoClient, BrevoError } from '@getbrevo/brevo';

import logger from '#configs/logger.js';

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
    private readonly senderName = 'Time Table',
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
}

const brevoClient = new BrevoClient({
  apiKey: env.BREVO_API_KEY,

  timeoutInSeconds: 10,

  maxRetries: 3,
});

export const brevoService = new BrevoService(brevoClient, env.EMAIL_ID, 'Time Table');
