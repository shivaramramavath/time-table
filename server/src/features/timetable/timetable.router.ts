import express from 'express';
import { timetableController } from './timetable.controller.js';
import { requestValidator } from '#middlewares/request-validator.js';
import { timetableSchema } from './schema/timetable.schema.js';

export const timetableRouter = express.Router();

timetableRouter.post('/', requestValidator(timetableSchema.create), timetableController.create);

timetableRouter.get('/', timetableController.getTimetables);

timetableRouter.get('/recent', timetableController.getRecentTimetables);

timetableRouter.get('/:timetableId', timetableController.get);

timetableRouter.patch('/:timetableId', timetableController.update);

timetableRouter.delete('/:timetableId', timetableController.delete);
