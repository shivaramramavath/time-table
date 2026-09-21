import redis from '#configs/redis.js';

const SOCKET_TTL = 24 * 60 * 60;

const getSocketKey = (userId: string) => `socket:user:${userId}`;

export const socketRegistry = {
  getSocketId: async (userId: string) => {
    const key = getSocketKey(userId);

    const socketId = await redis.get(key);

    if (socketId) {
      await redis.expire(key, SOCKET_TTL);
    }

    return socketId;
  },

  setSocketId: async (userId: string, socketId: string) => {
    return redis.set(getSocketKey(userId), socketId, 'EX', SOCKET_TTL);
  },

  removeSocketId: async (userId: string) => {
    return redis.del(getSocketKey(userId));
  },
};
