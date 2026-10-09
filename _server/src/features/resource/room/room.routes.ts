import { Router } from 'express';

import { roomController } from './room.controller.js';

export const roomRouter = Router();

roomRouter.post('/', roomController.create);

roomRouter.get('/', roomController.getAll);

roomRouter.get('/:id', roomController.getById);

roomRouter.patch('/:id', roomController.update);

roomRouter.delete('/:id', roomController.delete);
