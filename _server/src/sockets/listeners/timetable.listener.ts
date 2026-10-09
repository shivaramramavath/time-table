import type { Socket } from 'socket.io';
import createHttpError from 'http-errors';

import { TimetableService, timetableService } from '#features/timetable/timetable.service.js';

import { asyncSocketHandler } from '../handlers/async-socket-handler.js';

export class TimetableListener {
  constructor(
    private readonly socket: Socket,
    private readonly service: TimetableService,
  ) {}

  register(): void {
    this.registerUpdate();
    this.registerGet();
    this.registerGenerate();
  }

  private registerUpdate(): void {
    this.socket.on(
      'timetable:update',
      asyncSocketHandler('timetable:update', async (payload) => {
        const { timetableId, timetable } = payload;

        if (!timetableId) {
          throw createHttpError.BadRequest('Missing timetableId');
        }

        return this.service.update(timetableId, this.socket.data.user.userId, timetable);
      }),
    );
  }

  private registerGet(): void {
    this.socket.on(
      'timetable:get',
      asyncSocketHandler('timetable:get', async (payload) => {
        const { timetableId } = payload;

        if (!timetableId) {
          throw createHttpError.BadRequest('Missing timetableId');
        }

        return this.service.get(timetableId, this.socket.data.user.userId);
      }),
    );
  }

  private registerGenerate(): void {
    this.socket.on(
      'timetable:generate',
      asyncSocketHandler('timetable:generate', async (payload) => {
        const { timetableId } = payload;

        if (!timetableId) {
          throw createHttpError.BadRequest('Missing timetableId');
        }

        return this.service.generate({
          timetableId,
          userId: this.socket.data.user.userId,
        });
      }),
    );
  }
}

export const registerTimetableListeners = (socket: Socket): TimetableListener => {
  const listener = new TimetableListener(socket, timetableService);

  listener.register();

  return listener;
};
