import type { Socket } from 'socket.io';
import createHttpError from 'http-errors';

import { FacultyService, facultyService } from '#features/resource/faculty/faculty.service.js';

import { asyncSocketHandler } from '../handlers/async-socket-handler.js';

export class FacultyListener {
  constructor(
    private readonly socket: Socket,
    private readonly service: FacultyService,
  ) {}

  register(): void {
    this.registerCreate();
    this.registerUpdate();
    this.registerDelete();
  }

  private registerCreate(): void {
    this.socket.on(
      'faculty:create',
      asyncSocketHandler('faculty:create', async (payload) => {
        const { designerId, faculty } = payload;

        return this.service.create(faculty);
      }),
    );
  }

  private registerUpdate(): void {
    this.socket.on(
      'faculty:update',
      asyncSocketHandler('faculty:update', async (payload) => {
        const { designerId, facultyId, data } = payload;

        const updatedFaculty = await this.service.update(facultyId, data);

        if (!updatedFaculty) {
          throw createHttpError.InternalServerError('Failed to update faculty');
        }

        return updatedFaculty;
      }),
    );
  }

  private registerDelete(): void {
    this.socket.on(
      'faculty:delete',
      asyncSocketHandler('faculty:delete', async (payload) => {
        const { designerId, facultyId } = payload;

        const deleted = await this.service.delete(facultyId);

        if (!deleted) {
          throw createHttpError.InternalServerError('Failed to delete faculty');
        }

        return {
          facultyId,
        };
      }),
    );
  }
}

export const registerFacultyListeners = (socket: Socket): FacultyListener => {
  const listener = new FacultyListener(socket, facultyService);

  listener.register();

  return listener;
};
