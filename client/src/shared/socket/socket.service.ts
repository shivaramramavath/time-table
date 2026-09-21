import { env } from '@/app/config/env';
import { Token } from '@/features/auth/services/token.service';
import { io, type Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(env.backendUrl, {
      autoConnect: false,
      withCredentials: true,
      transports: ['websocket'],
    });
  }

  connect() {
    if (this.socket.connected) return;

    this.socket.auth = {
      token: Token.getToken(),
    };

    this.socket.connect();
  }

  reconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }

    this.socket.auth = {
      token: Token.getToken(),
    };

    this.socket.connect();
  }

  disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }

  updateToken() {
    this.socket.auth = {
      token: Token.getToken(),
    };
  }

  getSocket() {
    return this.socket;
  }

  get connected() {
    return this.socket.connected;
  }

  get active() {
    return this.socket.active;
  }
}

export const socketService = new SocketService();
