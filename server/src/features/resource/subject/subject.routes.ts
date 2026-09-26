import { Router } from 'express';

import { subjectController } from './subject.controller.js';

export const subjectRouter = Router();

subjectRouter.post('/', subjectController.create);

subjectRouter.get('/', subjectController.getAll);

subjectRouter.get('/:id', subjectController.getById);

subjectRouter.patch('/:id', subjectController.update);

subjectRouter.delete('/:id', subjectController.delete);
