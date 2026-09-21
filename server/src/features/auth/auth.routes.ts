import express from 'express';

import { requestValidator } from '#middlewares/request-validator.js';
import { authenticate } from '#middlewares/authenticate.js';

import { authSchema } from './schemas/auth.schema.js';
import { authController } from './auth.dependency.js';

export const authRouter: express.Router = express.Router();

authRouter.post('/register', requestValidator(authSchema.register), authController.register);

authRouter.post('/login', requestValidator(authSchema.login), authController.login);

authRouter.post('/google-login', authController.googleLogin);

authRouter.post('/google-register', authController.googleRegister);

authRouter.get('/me', authenticate, authController.me);

authRouter.post('/logout', authenticate, authController.logout);

authRouter.post(
  '/forgot-password',
  requestValidator(authSchema.forgotPassword),
  authController.forgotPassword,
);

authRouter.post('/refresh', authController.refresh);

authRouter.post(
  '/reset-password',
  requestValidator(authSchema.resetPassword),
  authController.resetPassword,
);
