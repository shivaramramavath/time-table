export const EMAIL_DELIVERY_QUEUE = 'email-delivery';

export const EMAIL_JOB_TYPES = {
  SEND_SIGNUP_GREETING: 'email.send.signup-greeting',
  SEND_PASSWORD_RESET: 'email.send.password-reset',
  SEND_FEEDBACK_THANK_YOU: 'email.send.feedback-thank-you',
} as const;

export type EmailJobType =
  (typeof EMAIL_JOB_TYPES)[keyof typeof EMAIL_JOB_TYPES];
