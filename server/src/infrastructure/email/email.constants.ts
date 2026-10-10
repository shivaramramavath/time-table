export const EMAIL_QUEUE = 'email';

export const EmailJobName = {
  SEND_SIGNUP_GREETING: 'email.send-signup-greeting',
  SEND_PASSWORD_RESET: 'email.send-password-reset',
} as const;

export type EmailJobName = (typeof EmailJobName)[keyof typeof EmailJobName];
