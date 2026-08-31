import { io } from "../../../server.js";
import { socketRegistry } from "../../../sockets/socket-registry.js";
import type { Edge } from "./edge.model.js";

export const edgeEmitter = {
  add: async (userId: string, edge: Edge) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("edge:add", edge);
  },

  update: async (userId: string, edge: Edge) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("edge:update", edge);
  },

  delete: async (userId: string, { id }: Pick<Edge, "id">) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("edge:delete", { id });
  },
};
