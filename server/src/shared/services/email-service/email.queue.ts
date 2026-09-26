import { BaseQueue } from '#shared/Base/BaseQueue.js';

export interface ForgotPasswordJob {
  email: string;
  token: string;
}

export interface RegisterGreetingJob {
  email: string;
  userName: string;
}

export interface FeedbackJob {
  email: string;
  message: string;
}

export type EmailJobData = ForgotPasswordJob | RegisterGreetingJob | FeedbackJob;

export class EmailQueue extends BaseQueue<EmailJobData> {
  constructor() {
    super('email');
  }

  async forgotPassword(data: ForgotPasswordJob) {
    return this.add('forgot-password', data);
  }

  async registerGreeting(data: RegisterGreetingJob) {
    return this.add('register-greeting', data);
  }

  async feedback(data: FeedbackJob) {
    return this.add('feedback', data);
  }
}

export const emailQueue = new EmailQueue();
