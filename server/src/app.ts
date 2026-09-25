import { env } from '#configs/env.js';

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import { httpLogger } from '#middlewares/http-logger.js';
import { routeNotFound } from '#middlewares/route-not-found.js';
import { errorHandler } from '#middlewares/error-handler.js';

import { authenticate } from '#middlewares/authenticate.js';

import { authRouter } from '#features/auth/auth.routes.js';
import { userRouter } from '#features/user/user.router.js';
import { timetableRouter } from '#features/timetable/timetable.router.js';
import { templateRouter } from '#features/template/template.route.js';
import { feedbackRouter } from '#features/feedback/feedback.routes.js';
import { resourceRouter } from '#features/resource/index.js';

const corsOptions = {
  origin: env.ORIGIN_URL,
  credentials: true,
};

const app = express();

app.set('view engine', 'ejs');
app.set('trust proxy', 1);

//! Middlewares
app.use(httpLogger);
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  compression({
    threshold: 1024,
    level: 6,
  }),
);

app.use('/api/auth', authRouter);
app.use('/api/user', authenticate, userRouter);
app.use('/api/timetable', authenticate, timetableRouter);
app.use('/api/resources', authenticate, resourceRouter);
app.use('/api/templates', authenticate, templateRouter);
app.use('/api/feedback', authenticate, feedbackRouter);

app.use(errorHandler);
app.use(routeNotFound);

export default app;
