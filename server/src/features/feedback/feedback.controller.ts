import type { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { feedbackService } from "./feedback.service.js";

export const feedbackController = {
  create: expressAsyncHandler(async (req: Request, res: Response) => {
    const { message, rating } = req.body;

    await feedbackService.create({ userId: req.userId, message, rating });

    res.status(201).json({ success: true });
  }),
};
