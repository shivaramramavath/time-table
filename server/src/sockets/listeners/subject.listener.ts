import type { Socket } from 'socket.io';
import createHttpError from 'http-errors';

import { SubjectService, subjectService } from '#features/resource/subject/subject.service.js';

import { asyncSocketHandler } from '../handlers/async-socket-handler.js';

export class SubjectListener {
  constructor(
    private readonly socket: Socket,
    private readonly service: SubjectService,
  ) {}

  register(): void {
    this.registerCreate();
    this.registerUpdate();
    this.registerDelete();
  }

  private registerCreate(): void {
    this.socket.on(
      'subject:create',
      asyncSocketHandler('subject:create', async (payload) => {
        const { designerId, subject } = payload;

        if (!designerId) {
          throw createHttpError.BadRequest('Designer ID is required');
        }

        if (!subject) {
          throw createHttpError.BadRequest('Subject is required');
        }

        return this.service.create(designerId, subject);
      }),
    );
  }

  private registerUpdate(): void {
    this.socket.on(
      'subject:update',
      asyncSocketHandler('subject:update', async (payload) => {
        const { designerId, subjectId, data } = payload;

        if (!designerId) {
          throw createHttpError.BadRequest('Designer ID is required');
        }

        if (!subjectId) {
          throw createHttpError.BadRequest('Subject ID is required');
        }

        const updatedSubject = await this.service.update(designerId, subjectId, data);

        if (!updatedSubject) {
          throw createHttpError.InternalServerError('Failed to update subject');
        }

        return updatedSubject;
      }),
    );
  }

  private registerDelete(): void {
    this.socket.on(
      'subject:delete',
      asyncSocketHandler('subject:delete', async (payload) => {
        const { designerId, subjectId } = payload;

        if (!designerId) {
          throw createHttpError.BadRequest('Designer ID is required');
        }

        if (!subjectId) {
          throw createHttpError.BadRequest('Subject ID is required');
        }

        const deleted = await this.service.delete(designerId, subjectId);

        if (!deleted) {
          throw createHttpError.InternalServerError('Failed to delete subject');
        }

        return {
          subjectId,
        };
      }),
    );
  }
}

export const registerSubjectListeners = (socket: Socket): SubjectListener => {
  const listener = new SubjectListener(socket, subjectService);

  listener.register();

  return listener;
};
