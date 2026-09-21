import type { Server, Socket } from 'socket.io';

import { errors } from '#utils/errors.js';

import { nodeService } from '#features/timetable-designer/node/node.service.js';

import { asyncSocketHandler } from '../lib/async-socket-handler.js';

export const registerNodeListeners = (io: Server, socket: Socket) => {
  // -----------------------------------------
  // CREATE
  // -----------------------------------------

  socket.on(
    'node:create',
    asyncSocketHandler('node:create', async (payload) => {
      const { designerId, node } = payload;

      return nodeService.create(designerId, node);
    }),
  );

  // -----------------------------------------
  // CREATE MANY
  // -----------------------------------------

  socket.on(
    'node:createMany',
    asyncSocketHandler('node:createMany', async (payload) => {
      const { designerId, nodes } = payload;

      return nodeService.createMany(designerId, nodes);
    }),
  );

  // -----------------------------------------
  // UPDATE
  // -----------------------------------------

  socket.on(
    'node:update',
    asyncSocketHandler('node:update', async (payload) => {
      const { designerId, nodeId, data } = payload;

      const updatedNode = await nodeService.update(designerId, nodeId, data);

      if (!updatedNode) {
        throw errors.internal('Failed to update node');
      }

      return updatedNode;
    }),
  );

  // -----------------------------------------
  // DELETE
  // -----------------------------------------

  socket.on(
    'node:delete',
    asyncSocketHandler('node:delete', async (payload) => {
      const { designerId, nodeId } = payload;

      const deleted = await nodeService.delete(designerId, nodeId);

      if (!deleted) {
        throw errors.internal('Failed to delete node');
      }

      return {
        nodeId,
      };
    }),
  );

  // -----------------------------------------
  // DELETE MANY
  // -----------------------------------------

  socket.on(
    'node:deleteMany',
    asyncSocketHandler('node:deleteMany', async (payload) => {
      const { designerId, nodeIds } = payload;

      const deleted = await nodeService.deleteMany(designerId, nodeIds);

      return {
        nodeIds,
        deletedCount: deleted,
      };
    }),
  );
};
