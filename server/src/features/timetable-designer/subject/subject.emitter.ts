import { io } from "../../../server.js";
import { socketRegistry } from "../../../sockets/socket-registry.js";
import type { Subject } from "./subject.model.js";

export const subjectEmitter = {
  add: async (userId: string, subject: Subject) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("subject:add", subject);
  },

  update: async (userId: string, subject: Subject) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("subject:update", subject);
  },

  delete: async (userId: string, { id }: Pick<Subject, "id">) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("subject:delete", { id });
  },
};
