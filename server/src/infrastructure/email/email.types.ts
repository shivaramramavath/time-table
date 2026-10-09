export interface SendEmailOptions {
  toEmail: string;
  toName?: string;
  subject: string;
  htmlContent: string;
}

export interface SignUpGreeting {
  toEmail: string;
  toName: string;
  data: {
    userName: string;
    email: string;
  };
}
