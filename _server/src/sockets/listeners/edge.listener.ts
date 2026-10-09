import type { Socket } from 'socket.io';
import createHttpError from 'http-errors';

import { EdgeService, edgeService } from '#features/timetable-designer/edge/edge.service.js';

import { asyncSocketHandler } from '../handlers/async-socket-handler.js';

export class EdgeListener {
  constructor(
    private readonly socket: Socket,
    private readonly service: EdgeService,
  ) {}

  register(): void {
    this.registerCreate();
    this.registerCreateMany();
    this.registerDelete();
    this.registerDeleteMany();
  }

  private registerCreate(): void {
    this.socket.on(
      'edge:create',
      asyncSocketHandler('edge:create', async (payload) => {
        const { designerId, edge } = payload;

        return this.service.create(designerId, edge);
      }),
    );
  }

  private registerCreateMany(): void {
    this.socket.on(
      'edge:createMany',
      asyncSocketHandler('edge:createMany', async (payload) => {
        const { designerId, edges } = payload;

        return this.service.createMany(designerId, edges);
      }),
    );
  }

  private registerDelete(): void {
    this.socket.on(
      'edge:delete',
      asyncSocketHandler('edge:delete', async (payload) => {
        const { designerId, edgeId } = payload;

        const deleted = await this.service.delete(designerId, edgeId);

        if (!deleted) {
          throw createHttpError.InternalServerError('Failed to delete edge');
        }

        return {
          edgeId,
        };
      }),
    );
  }

  private registerDeleteMany(): void {
    this.socket.on(
      'edge:deleteMany',
      asyncSocketHandler('edge:deleteMany', async (payload) => {
        const { designerId, edgeIds } = payload;

        const deleted = await this.service.deleteMany(designerId, edgeIds);

        return {
          edgeIds,
          deletedCount: deleted,
        };
      }),
    );
  }
}

export const registerEdgeListeners = (socket: Socket): EdgeListener => {
  const listener = new EdgeListener(socket, edgeService);

  listener.register();

  return listener;
};
