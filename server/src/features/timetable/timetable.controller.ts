import expressAsyncHandler from 'express-async-handler';

import type { Request, Response } from 'express';

import { timetableService, type TimetableService } from './timetable.service.js';

export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  create = expressAsyncHandler(async (req: Request, res: Response) => {
    const timetable = await this.timetableService.create({
      userId: req.userId as string,
      title: req.body.title,
      description: req.body.description,
    });

    res.status(201).json({
      success: true,
      timetable,
    });
  });

  getTimetables = expressAsyncHandler(async (req: Request, res: Response) => {
    const page = Math.max(Number(req.query.page) || 1, 1);

    const query = typeof req.query.query === 'string' ? req.query.query : '';

    const timetables = await this.timetableService.getTimetables({
      userId: req.userId as string,
      page,
      query,
    });

    res.status(200).json({
      success: true,
      timetables,
      page,
    });
  });

  getRecentTimetables = expressAsyncHandler(async (req: Request, res: Response) => {
    const timetables = await this.timetableService.getRecentTimetables(req.userId as string);

    res.status(200).json({
      success: true,
      timetables,
    });
  });

  get = expressAsyncHandler(async (req: Request, res: Response) => {
    const { timetableId } = req.params;

    const timetable = await this.timetableService.get(timetableId as string, req.userId as string);

    res.status(200).json({
      success: true,
      timetable,
    });
  });

  update = expressAsyncHandler(async (req: Request, res: Response) => {
    const { timetableId } = req.params;

    const timetable = await this.timetableService.update(timetableId as string, req.userId as string, req.body);

    res.status(200).json({
      success: true,
      timetable,
    });
  });

  delete = expressAsyncHandler(async (req: Request, res: Response) => {
    const { timetableId } = req.params;

    await this.timetableService.delete(timetableId as string, req.userId as string);

    res.status(200).json({
      success: true,
      message: 'Timetable deleted',
    });
  });
}

export const timetableController = new TimetableController(timetableService);
