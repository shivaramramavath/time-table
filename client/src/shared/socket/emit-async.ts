import { socketService } from './socket.service';

export interface SocketResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

export function emitAsync<T>(event: string, payload?: unknown): Promise<T> {
  const socket = socketService.getSocket();

  return new Promise<T>((resolve, reject) => {
    if (!socket.connected) {
      reject(new Error('Socket is not connected'));
      return;
    }

    socket.emit(event, payload, (response: SocketResponse<T>) => {
      if (!response.success) {
        reject(new Error(response.message ?? `Failed to execute ${event}`));
        return;
      }

      if (response.data === undefined) {
        reject(new Error(`No data returned from ${event}`));
        return;
      }

      resolve(response.data);
    });
  });
}
