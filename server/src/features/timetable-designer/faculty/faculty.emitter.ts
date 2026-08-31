import { io } from "../../../server.js";
import { socketRegistry } from "../../../sockets/socket-registry.js";
import type { Faculty } from "./faculty.model.js";

export const facultyEmitter = {
  add: async (userId: string, faculty: Faculty) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("faculty:add", faculty);
  },

  update: async (userId: string, faculty: Faculty) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("faculty:update", faculty);
  },

  delete: async (userId: string, { id }: Pick<Faculty, "id">) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("faculty:delete", { id });
  },
};
