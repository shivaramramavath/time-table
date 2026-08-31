import { io } from "../../../server.js";
import { socketRegistry } from "../../../sockets/socket-registry.js";
import { Node } from "./node.model.js";

export const nodeEmitter = {
  add: async (userId: string, node: Node) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("node:add", node);
  },

  update: async (userId: string, node: Node) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("node:update", node);
  },

  delete: async (userId: string, { id }) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("node:delete", { id });
  },
};
