import type { Request, Response } from 'express';

import { TemplateService } from './template.service.js';

export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  get = async (req: Request, res: Response) => {
    const { id } = req.params;

    const template = await this.templateService.get(id, req.userId);

    res.status(200).json({
      success: true,
      data: template,
    });
  };

  getAll = async (req: Request, res: Response) => {
    const templates = await this.templateService.getAll(req.userId);

    res.status(200).json({
      success: true,
      data: templates,
    });
  };

  getPrivate = async (req: Request, res: Response) => {
    const templates = await this.templateService.getPrivate(req.userId);

    res.status(200).json({
      success: true,
      data: templates,
    });
  };

  getPublic = async (req: Request, res: Response) => {
    const templates = await this.templateService.getPublic();

    res.status(200).json({
      success: true,
      data: templates,
    });
  };
}
