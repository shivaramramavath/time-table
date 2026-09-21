import type { Server, Socket } from 'socket.io';

import { errors } from '#utils/errors.js';

import { edgeService } from '#features/timetable-designer/edge/edge.service.js';

import { asyncSocketHandler } from '../lib/async-socket-handler.js';

export const registerEdgeListeners = (io: Server, socket: Socket) => {
  // -----------------------------------------
  // CREATE
  // -----------------------------------------

  socket.on(
    'edge:create',
    asyncSocketHandler('edge:create', async (payload) => {
      const { designerId, edge } = payload;

      return edgeService.create(designerId, edge);
    }),
  );

  // -----------------------------------------
  // CREATE MANY
  // -----------------------------------------

  socket.on(
    'edge:createMany',
    asyncSocketHandler('edge:createMany', async (payload) => {
      const { designerId, edges } = payload;

      return edgeService.createMany(designerId, edges);
    }),
  );

  // -----------------------------------------
  // DELETE
  // -----------------------------------------

  socket.on(
    'edge:delete',
    asyncSocketHandler('edge:delete', async (payload) => {
      const { designerId, edgeId } = payload;

      const deleted = await edgeService.delete(designerId, edgeId);

      if (!deleted) {
        throw errors.internal('Failed to delete edge');
      }

      return {
        edgeId,
      };
    }),
  );

  // -----------------------------------------
  // DELETE MANY
  // -----------------------------------------

  socket.on(
    'edge:deleteMany',
    asyncSocketHandler('edge:deleteMany', async (payload) => {
      const { designerId, edgeIds } = payload;

      const deleted = await edgeService.deleteMany(designerId, edgeIds);

      return {
        edgeIds,
        deletedCount: deleted,
      };
    }),
  );
};
