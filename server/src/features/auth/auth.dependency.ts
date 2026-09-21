import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

import { userService } from '#features/user/user.dependency.js';
import { QueueService } from '#services/queue.service.js';
import redis from '#configs/redis.js';

import { PasswordService } from './services/password.service.js';
import { SessionService } from './services/session.service.js';
import { TokenService } from './services/token.service.js';
import { CookieService } from './services/cookie.service.js';
import { GoogleService } from './services/google.service.js';

import { OAuth2Client } from 'google-auth-library';
import { Queue } from 'bullmq';

const emailQueue = new Queue('email', {
  connection: redis,

  defaultJobOptions: {
    attempts: 3,

    backoff: {
      type: 'exponential',
      delay: 3000,
    },

    removeOnComplete: true,
    removeOnFail: false,

    priority: 2,
  },
});

// Infrastructure / external dependencies
const googleClient = new OAuth2Client();

// Services
const passwordService = new PasswordService();

export const tokenService = new TokenService();

const sessionService = new SessionService(redis, tokenService);

const cookieService = new CookieService();

const googleService = new GoogleService(googleClient);

export const queueService = new QueueService(emailQueue);

// Application service
const authService = new AuthService(
  userService,
  passwordService,
  sessionService,
  tokenService,
  queueService,
);

// Controller
export const authController = new AuthController(authService, cookieService, googleService);
