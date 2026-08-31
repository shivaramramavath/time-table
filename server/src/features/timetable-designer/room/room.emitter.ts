import { io } from "../../../server.js";
import { socketRegistry } from "../../../sockets/socket-registry.js";
import type { Room } from "./room.model.js";

export const roomEmitter = {
  add: async (userId: string, room: Room) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("room:add", room);
  },

  update: async (userId: string, room: Room) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("room:update", room);
  },

  delete: async (userId: string, { id }: Pick<Room, "id">) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("room:delete", { id });
  },
};
