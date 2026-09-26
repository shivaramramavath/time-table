import redis from '#configs/redis.js';

const SOCKET_TTL = 24 * 60 * 60;

export class SocketRegistry {
  constructor(private readonly ttl = SOCKET_TTL) {}

  private getKey(userId: string): string {
    return `socket:user:${userId}`;
  }

  async getSocketId(userId: string): Promise<string | null> {
    const key = this.getKey(userId);

    const socketId = await redis.get(key);

    if (socketId) {
      await redis.expire(key, this.ttl);
    }

    return socketId;
  }

  async setSocketId(userId: string, socketId: string): Promise<string> {
    return redis.set(this.getKey(userId), socketId, 'EX', this.ttl);
  }

  async removeSocketId(userId: string): Promise<number> {
    return redis.del(this.getKey(userId));
  }
}

export const socketRegistry = new SocketRegistry();
