import { Router } from 'express';
import { templateController } from './template.controller.js';

export const templateRouter = Router();

templateRouter.get('/', templateController.getAll);

templateRouter.get('/private', templateController.getPrivate);

templateRouter.get('/public', templateController.getPublic);

templateRouter.get('/:id', templateController.get);
