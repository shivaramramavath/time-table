export interface EmailRecipient {
  email: string;
  name?: string;
}

export interface SignupGreetingEmailData {
  recipient: EmailRecipient;
  userName: string;
}

export interface PasswordResetEmailData {
  recipient: EmailRecipient;
  resetUrl: string;
}

export interface EmailMessage {
  recipient: EmailRecipient;
  subject: string;
  html: string;
}
