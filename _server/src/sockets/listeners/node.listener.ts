import type { Socket } from 'socket.io';
import createHttpError from 'http-errors';

import { NodeService, nodeService } from '#features/timetable-designer/node/node.service.js';

import { asyncSocketHandler } from '../handlers/async-socket-handler.js';

export class NodeListener {
  constructor(
    private readonly socket: Socket,
    private readonly service: NodeService,
  ) {}

  register(): void {
    this.registerCreate();
    this.registerCreateMany();
    this.registerUpdate();
    this.registerDelete();
    this.registerDeleteMany();
  }

  private registerCreate(): void {
    this.socket.on(
      'node:create',
      asyncSocketHandler('node:create', async (payload) => {
        const { designerId, node } = payload;

        return this.service.create(designerId, node);
      }),
    );
  }

  private registerCreateMany(): void {
    this.socket.on(
      'node:createMany',
      asyncSocketHandler('node:createMany', async (payload) => {
        const { designerId, nodes } = payload;

        return this.service.createMany(designerId, nodes);
      }),
    );
  }

  private registerUpdate(): void {
    this.socket.on(
      'node:update',
      asyncSocketHandler('node:update', async (payload) => {
        const { designerId, nodeId, data } = payload;

        const updatedNode = await this.service.update(designerId, nodeId, data);

        if (!updatedNode) {
          throw createHttpError.InternalServerError('Failed to update node');
        }

        return updatedNode;
      }),
    );
  }

  private registerDelete(): void {
    this.socket.on(
      'node:delete',
      asyncSocketHandler('node:delete', async (payload) => {
        const { designerId, nodeId } = payload;

        const deleted = await this.service.delete(designerId, nodeId);

        if (!deleted) {
          throw createHttpError.InternalServerError('Failed to delete node');
        }

        return {
          nodeId,
        };
      }),
    );
  }

  private registerDeleteMany(): void {
    this.socket.on(
      'node:deleteMany',
      asyncSocketHandler('node:deleteMany', async (payload) => {
        const { designerId, nodeIds } = payload;

        const deleted = await this.service.deleteMany(designerId, nodeIds);

        return {
          nodeIds,
          deletedCount: deleted,
        };
      }),
    );
  }
}

export const registerNodeListeners = (socket: Socket): NodeListener => {
  const listener = new NodeListener(socket, nodeService);

  listener.register();

  return listener;
};
