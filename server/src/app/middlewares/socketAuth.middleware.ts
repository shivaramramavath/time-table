import type { Socket } from 'socket.io';
import { errors } from '#utils/errors.js';
import { tokenService } from '#features/auth/auth.dependency.js';

export const socketAuth = (socket: Socket, next: (err?: Error) => void) => {
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(errors.forbidden());
  }

  try {
    const payload = tokenService.verifyAccessToken(token);

    socket.data.user = {
      userId: payload.sub,
    };

    return next();
  } catch (error) {
    console.error('Socket authentication failed:', error);

    return next(errors.forbidden());
  }
};
