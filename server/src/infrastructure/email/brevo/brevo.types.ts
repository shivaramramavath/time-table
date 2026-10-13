export interface EmailRecipient {
  email: string;
  name?: string;
}

export interface EmailMessage {
  recipient: EmailRecipient;
  subject: string;
  htmlContent: string;
}
