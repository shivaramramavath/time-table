import type { Job } from 'bullmq';
import createHttpError from 'http-errors';

import { BaseProcess } from '#shared/Base/BaseProcess.js';

import type { TimetableJobData } from './timetable.queue.js';
import { timetableRepository } from './timetable.repository.js';
import { timetableDesignerService } from '#features/timetable-designer/timetable-designer.service.js';

export class TimetableProcess extends BaseProcess<TimetableJobData> {
  async execute(job: Job<TimetableJobData>): Promise<void> {
    switch (job.name) {
      case 'timetable:create':
        await this.create(job.data);
        break;

      case 'timetable:update':
        await this.update(job.data);
        break;

      case 'timetable:delete':
        await this.delete(job.data);
        break;

      case 'timetable:generate':
        await this.generate(job.data);
        break;

      default:
        throw new Error(`Unsupported timetable job: ${job.name}`);
    }
  }

  private async create(data: TimetableJobData): Promise<void> {
    const timetable = await timetableRepository.getById(data.timetableId, data.userId);

    if (!timetable) {
      throw createHttpError.NotFound('Timetable not found');
    }

    await timetableDesignerService.create(data.timetableId);
  }

  private async update(data: TimetableJobData): Promise<void> {
    const timetable = await timetableRepository.getById(data.timetableId, data.userId);

    if (!timetable) {
      throw createHttpError.NotFound('Timetable not found');
    }

    // Add asynchronous update logic here.
    // Example:
    // - invalidate cache
    // - update search index
    // - notify connected clients
    // - recalculate timetable metadata
  }

  private async delete(data: TimetableJobData): Promise<void> {
    const timetable = await timetableRepository.getById(data.timetableId, data.userId);

    if (!timetable) {
      return;
    }

    // Add asynchronous cleanup here.
    // Example:
    // - delete designer data
    // - remove cache
    // - remove search index
  }

  private async generate(data: TimetableJobData): Promise<void> {
    const timetable = await timetableRepository.getById(data.timetableId, data.userId);

    if (!timetable) {
      throw createHttpError.NotFound('Timetable not found');
    }

    // Timetable generation logic goes here.
    //
    // Example:
    // 1. Load subjects
    // 2. Load faculty
    // 3. Load rooms
    // 4. Load constraints
    // 5. Generate timetable
    // 6. Save generated timetable
  }
}
