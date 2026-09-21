import { emitToUser } from '../../../sockets/emit-to-user.js';

export type MessageStatus =
  | 'thinking'
  | 'analyzing'
  | 'understanding'
  | 'retrieving'
  | 'planning'
  | 'validating'
  | 'executing'
  | 'verifying'
  | 'responding';

export const messageEmitter = {
  start: (userId: string, data: { messageId: string }) => emitToUser(userId, 'message:start', data),

  token: (
    userId: string,
    data: {
      messageId: string;
      content: string;
      seq: number;
      timestamp: number;
    },
  ) => emitToUser(userId, 'message:token', data),

  status: (
    userId: string,
    data: {
      messageId: string;
      status: MessageStatus;
    },
  ) => emitToUser(userId, 'message:status', data),

  finish: (userId: string, data: { messageId: string }) =>
    emitToUser(userId, 'message:finish', data),

  error: (userId: string, data: { message: string }) => emitToUser(userId, 'message:error', data),
};
