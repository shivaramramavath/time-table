import { io } from "../../../server.js";
import { socketRegistry } from "../../../sockets/socket-registry.js";

export type DesignerEmitter<T extends { id: string }> = {
  add(userId: string, entity: T): Promise<void>;
  update(userId: string, entity: T): Promise<void>;
  delete(userId: string, entity: Pick<T, "id">): Promise<void>;
};

export const createDesignerEmitter = <T extends { id: string }>(
  resource: string,
): DesignerEmitter<T> => {
  return {
    add: async (userId, entity) => {
      const socketId = await socketRegistry.getSocketId(userId);

      if (!socketId) return;

      io.to(socketId).emit(`${resource}:add`, entity);
    },

    update: async (userId, entity) => {
      const socketId = await socketRegistry.getSocketId(userId);

      if (!socketId) return;

      io.to(socketId).emit(`${resource}:update`, entity);
    },

    delete: async (userId, { id }) => {
      const socketId = await socketRegistry.getSocketId(userId);

      if (!socketId) return;

      io.to(socketId).emit(`${resource}:delete`, { id });
    },
  };
};
