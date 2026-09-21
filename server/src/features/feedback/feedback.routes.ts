import express from 'express';
import { feedbackController } from './feedback.dependency.js';

export const feedbackRouter = express.Router();

feedbackRouter.post('/create', feedbackController.create);
