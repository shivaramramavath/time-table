import expressAsyncHandler from "express-async-handler";
import { timetableService } from "./timetable.service.js";

export const timetableController = {
  create: expressAsyncHandler(async (req, res) => {
    const userId = req.userId;

    const timetable = await timetableService.create({
      userId,
    });

    res.status(201).json({
      success: true,
      timetable,
    });
  }),

  getTimetables: expressAsyncHandler(async (req, res) => {
    const userId = req.userId;

    const page = Math.max(Number(req.query.page) || 1, 1);

    const query = typeof req.query.query === "string" ? req.query.query : "";

    const timetables = await timetableService.getTimetables({
      userId,
      page,
      query,
    });

    res.status(200).json({
      success: true,
      timetables,
      page,
    });
  }),

  getRecentTimetables: expressAsyncHandler(async (req, res) => {
    const timetables = await timetableService.getRecentTimetables(req.userId);

    res.status(200).json({
      success: true,
      timetables,
    });
  }),

  get: expressAsyncHandler(async (req, res) => {
    const { timetableId } = req.params;

    const timetable = await timetableService.get(timetableId, req.userId);

    res.status(200).json({
      success: true,
      timetable,
    });
  }),

  update: expressAsyncHandler(async (req, res) => {
    const { timetableId } = req.params;

    const timetable = await timetableService.update(
      timetableId,
      req.userId,
      req.body,
    );

    res.status(200).json({
      success: true,
      timetable,
    });
  }),

  delete: expressAsyncHandler(async (req, res) => {
    const { timetableId } = req.params;

    await timetableService.delete(timetableId, req.userId);

    res.status(200).json({
      success: true,
      message: "Timetable deleted",
    });
  }),
};
