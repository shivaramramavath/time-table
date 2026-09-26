import type { Request, Response } from 'express';

import { roomService } from './room.service.js';

export class RoomController {
  async create(req: Request, res: Response) {
    const designerId = req.params.designerId as string;

    const room = await roomService.create(designerId, req.body);

    res.status(201).json({
      success: true,
      data: room,
    });
  }

  async getById(req: Request, res: Response) {
    const designerId = req.params.designerId as string;
    const roomId = req.params.id as string;

    const room = await roomService.getById(designerId, roomId);

    res.status(200).json({
      success: true,
      data: room,
    });
  }

  async getAll(req: Request, res: Response) {
    const designerId = req.params.designerId as string;

    const rooms = await roomService.getAll(designerId);

    res.status(200).json({
      success: true,
      data: rooms,
    });
  }

  async update(req: Request, res: Response) {
    const designerId = req.params.designerId as string;
    const roomId = req.params.id as string;

    const room = await roomService.update(designerId, roomId, req.body);

    res.status(200).json({
      success: true,
      data: room,
    });
  }

  async delete(req: Request, res: Response) {
    const designerId = req.params.designerId as string;
    const roomId = req.params.id as string;

    const room = await roomService.delete(designerId, roomId);

    res.status(200).json({
      success: true,
      data: room,
    });
  }
}

export const roomController = new RoomController();
