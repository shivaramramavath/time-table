import { Router } from 'express';

import { facultyController } from './faculty.controller.js';

export const facultyRouter = Router();

facultyRouter.post('/', facultyController.create.bind(facultyController));

facultyRouter.get('/', facultyController.getAll.bind(facultyController));

facultyRouter.get('/:id', facultyController.getById.bind(facultyController));

facultyRouter.patch('/:id', facultyController.update.bind(facultyController));

facultyRouter.delete('/:id', facultyController.delete.bind(facultyController));
