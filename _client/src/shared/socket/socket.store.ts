import { create } from 'zustand';

export type SocketStatus = 'connecting' | 'connected' | 'disconnected' | 'reconnecting';

interface SocketState {
  status: SocketStatus;
  hasConnectedOnce: boolean;

  setStatus: (status: SocketStatus) => void;
}

export const useSocketStore = create<SocketState>((set) => ({
  status: 'connecting',
  hasConnectedOnce: false,

  setStatus: (status) =>
    set({
      status,
      ...(status === 'connected' ? { hasConnectedOnce: true } : {}),
    }),
}));
