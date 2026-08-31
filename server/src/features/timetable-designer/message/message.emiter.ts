import { io } from "../../../server.js";
import { socketRegistry } from "../../../sockets/socket-registry.js";

export type MessageStatus =
  | "thinking"
  | "analyzing"
  | "understanding"
  | "retrieving"
  | "planning"
  | "validating"
  | "executing"
  | "verifying"
  | "responding";

type MessageEmitter = {
  start: (userId: string, { messageId }: { messageId: string }) => void;
  token: (
    userId: string,
    {
      messageId,
      content,
      seq,
      timestamp,
    }: { messageId: string; content: string; seq: number; timestamp: number },
  ) => void;
  status: (
    userId: string,
    { messageId, status }: { messageId: string; status: MessageStatus },
  ) => void;
  finish: (userId: string, { messageId }: { messageId: string }) => void;
  error: (userId: string, { message }: { message: string }) => void;
};

export const messageEmitter: MessageEmitter = {
  start: async (userId: string, { messageId }) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("message:start", { messageId });
  },

  token: async (userId: string, { messageId, content, seq, timestamp }) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("message:token", {
      messageId,
      content,
      seq,
      timestamp,
    });
  },

  status: async (userId: string, { messageId, status }) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("message:status", { messageId, status });
  },

  finish: async (userId: string, { messageId }) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("message:finish", { messageId });
  },

  error: async (userId: string, { message }) => {
    const socketId = await socketRegistry.getSocketId(userId);

    if (!socketId) return;

    io.to(socketId).emit("message:error", { message });
  },
};
