export interface EmailRecipient {
  email: string;
  name?: string;
}

export interface SignupGreetingJob {
  recipient: EmailRecipient;
  userName: string;
}

export interface PasswordResetJob {
  recipient: EmailRecipient;
  resetUrl: string;
}

export interface FeedbackThankYouJob {
  recipient: EmailRecipient;
  userName: string;
  category: string;
  rating: number;
}

export interface EmailJobMap {
  [key: string]: unknown;
}
