import type { Request, Response } from 'express';

import { subjectService } from './subject.service.js';

export class SubjectController {
  async create(req: Request, res: Response) {
    const subject = await subjectService.create(req.body);

    res.status(201).json({
      success: true,
      data: subject,
    });
  }

  async getById(req: Request, res: Response) {
    const subjectId = req.params.id as string;

    const subject = await subjectService.getById(subjectId);

    res.status(200).json({
      success: true,
      data: subject,
    });
  }

  async getAll(req: Request, res: Response) {
    const subjects = await subjectService.getAll();

    console.log(subjects);

    res.status(200).json({
      success: true,
      data: subjects,
    });
  }

  async update(req: Request, res: Response) {
    const subjectId = req.params.id as string;

    const subject = await subjectService.update(subjectId, req.body);

    res.status(200).json({
      success: true,
      data: subject,
    });
  }

  async delete(req: Request, res: Response) {
    const subjectId = req.params.id as string;

    const subject = await subjectService.delete(subjectId);

    res.status(200).json({
      success: true,
      data: subject,
    });
  }
}

export const subjectController = new SubjectController();
