import type { Socket } from 'socket.io';
import createHttpError from 'http-errors';

import {
  TimetableDesignerService,
  timetableDesignerService,
} from '#features/timetable-designer/timetable-designer.service.js';

import { asyncSocketHandler } from '../handlers/async-socket-handler.js';

export class TimetableDesignerListener {
  constructor(
    private readonly socket: Socket,
    private readonly service: TimetableDesignerService,
  ) {}

  register(): void {
    this.registerGet();
  }

  private registerGet(): void {
    this.socket.on(
      'timetable-designer:get',
      asyncSocketHandler('timetable-designer:get', async (payload) => {
        const { timetableId } = payload;

        if (!timetableId) {
          throw createHttpError.BadRequest('Missing timetableId');
        }

        return this.service.getOrCreate(timetableId);
      }),
    );
  }
}

export const registerTimetableDesignerListeners = (socket: Socket): TimetableDesignerListener => {
  const listener = new TimetableDesignerListener(socket, timetableDesignerService);

  listener.register();

  return listener;
};
