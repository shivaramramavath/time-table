import { Router } from 'express';
import { facultyRouter } from './faculty/faculty.route.js';
import { roomRouter } from './room/room.routes.js';
import { subjectRouter } from './subject/subject.routes.js';

export const resourceRouter = Router();

resourceRouter.use('/faculty', facultyRouter);
resourceRouter.use('/room', roomRouter);
resourceRouter.use('/subject', subjectRouter);
