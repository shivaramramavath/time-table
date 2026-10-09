import type { Queue } from 'bullmq';

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

export class QueueService {
  constructor(private readonly emailQueue: Queue) {}

  async forgotPassword(data: ForgotPasswordJob) {
    return this.emailQueue.add('forgot-password', data);
  }

  async registerGreeting(data: RegisterGreetingJob) {
    return this.emailQueue.add('register-greeting', data);
  }

  async feedback(data: FeedbackJob) {
    return this.emailQueue.add('feedback', data);
  }
}
