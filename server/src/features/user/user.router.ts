import { Router } from 'express';

import { userController } from './user.dependency.js';

export const userRouter = Router();

userRouter.get('/me', userController.me);
