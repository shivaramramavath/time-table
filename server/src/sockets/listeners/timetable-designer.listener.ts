import type { Server, Socket } from 'socket.io';
import createHttpError from 'http-errors';

import { timetableDesignerService } from '#features/timetable-designer/timetable-designer.service.js';
import { asyncSocketHandler } from '../lib/async-socket-handler.js';

export const registerTimetableDesignerListeners = (io: Server, socket: Socket) => {
  socket.on(
    'timetable-designer:get',
    asyncSocketHandler('timetable-designer:get', async (payload) => {
      const { timetableId } = payload;

      if (!timetableId) {
        throw createHttpError.BadRequest('Missing timetableId');
      }

      const timetableDesigner = await timetableDesignerService.getOrCreate(timetableId);

      return timetableDesigner;
    }),
  );
};
