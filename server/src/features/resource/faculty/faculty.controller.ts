import type { Request, Response } from 'express';

import { facultyService } from './faculty.service.js';

export class FacultyController {
  async create(req: Request, res: Response) {
    const faculty = await facultyService.create(req.body);

    res.status(201).json({
      success: true,
      data: faculty,
    });
  }

  async getById(req: Request, res: Response) {
    const faculty = await facultyService.getById(req.params.id as string);

    res.status(200).json({
      success: true,
      data: faculty,
    });
  }

  async getAll(req: Request, res: Response) {
    const faculty = await facultyService.getAll({
      name: req.query.name ?? '',
    });

    res.status(200).json({
      success: true,
      data: faculty,
    });
  }

  async update(req: Request, res: Response) {
    const faculty = await facultyService.update(req.params.id as string, req.body);

    res.status(200).json({
      success: true,
      data: faculty,
    });
  }

  async delete(req: Request, res: Response) {
    const faculty = await facultyService.delete(req.params.id as string);

    res.status(200).json({
      success: true,
      data: faculty,
    });
  }
}

export const facultyController = new FacultyController();
