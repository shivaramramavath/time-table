import type { Server, Socket } from 'socket.io';

import { facultyService } from '#features/timetable-designer/faculty/faculty.service.js';
import { asyncSocketHandler } from '../lib/async-socket-handler.js';
import { errors } from '#utils/errors.js';

export const registerFacultyListeners = (io: Server, socket: Socket) => {
  socket.on(
    'faculty:create',
    asyncSocketHandler('faculty:create', async (payload) => {
      const { designerId, faculty } = payload;

      return facultyService.create(designerId, faculty);
    }),
  );

  socket.on(
    'faculty:update',
    asyncSocketHandler('faculty:update', async (payload) => {
      const { designerId, facultyId, data } = payload;

      const updatedFaculty = await facultyService.update(designerId, facultyId, data);

      if (!updatedFaculty) {
        throw errors.internal('Failed to update faculty');
      }

      return updatedFaculty;
    }),
  );

  socket.on(
    'faculty:delete',
    asyncSocketHandler('faculty:delete', async (payload) => {
      const { designerId, facultyId } = payload;

      const deleted = await facultyService.delete(designerId, facultyId);

      if (!deleted) {
        throw errors.internal('Failed to delete faculty');
      }

      return {
        facultyId,
      };
    }),
  );
};
