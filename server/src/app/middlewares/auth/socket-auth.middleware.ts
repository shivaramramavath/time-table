import type { Socket } from 'socket.io';
import createError from 'http-errors';
import { tokenService } from '#features/auth/auth.dependency.js';

export const socketAuth =async (socket: Socket, next: (err?: Error) => void) => {
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(createError.Forbidden());
  }

  try {
    const payload = await tokenService.verifyAccessToken(token);

    socket.data.user = {
      userId: payload.sub,
    };

    return next();
  } catch (error) {
    console.error('Socket authentication failed:', error);

    return next(createError.Forbidden());
  }
};
