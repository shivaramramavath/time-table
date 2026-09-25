import { Router } from 'express';
import { facultyRouter } from './faculty/faculty.route.js';

export const resourceRouter = Router();

resourceRouter.use('/faculty', facultyRouter);
// resourceRouter.use('/room');
// resourceRouter.use('/subject');
