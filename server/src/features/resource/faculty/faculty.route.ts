import { Router } from 'express';

import { facultyController } from './faculty.controller.js';

export const facultyRouter = Router();

facultyRouter.post('/', facultyController.create);

facultyRouter.get('/', facultyController.getAll);

facultyRouter.get('/:id', facultyController.getById);

facultyRouter.patch('/:id', facultyController.update);

facultyRouter.delete('/:id', facultyController.delete);
