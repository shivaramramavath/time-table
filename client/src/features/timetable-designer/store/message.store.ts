import { create } from "zustand";

import type { Message } from "../types";

interface StreamingMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  seq?: number;
  createdAt: string;
}

interface MessageState {
  messages: Message[];
  streamingMessage: StreamingMessage | null;

  isLoading: boolean;
  hasMore: boolean;

  send: (msg: Message) => void;
  setHasMore: (hasMore: boolean) => void;
  receive: (msg: Message) => void;
  prependMany: (messages: Message[]) => void;

  start: (messageId: string) => void;
  update: ({ content, seq, timestamp }) => void;
  finish: () => void;

  clear: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  streamingMessage: null,

  isLoading: false,
  hasMore: false,

  setHasMore: (hasMore) => set({ hasMore }),

  send: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
      isLoading: true,
    })),

  receive: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),

  prependMany: (messages) =>
    set((state) => ({
      messages: [...messages, ...state.messages],
    })),

  start: (messageId) =>
    set({
      streamingMessage: {
        id: messageId,
        role: "assistant",
        content: "",
        createdAt: new Date().toISOString(),
      },

      isLoading: true,
    }),

  update: ({ content, seq, timestamp }) =>
    set((state) => {
      const streamingMessage = state.streamingMessage;

      if (!streamingMessage) {
        return state;
      }

      if (streamingMessage.seq !== undefined && seq <= streamingMessage.seq) {
        return state;
      }

      return {
        streamingMessage: {
          ...streamingMessage,
          content: streamingMessage.content + content,
          seq,
          createdAt: new Date(timestamp).toISOString(),
        },
      };
    }),

  finish: () =>
    set((state) => {
      const streamingMessage = state.streamingMessage;

      if (!streamingMessage) {
        return {
          isLoading: false,
          streamingMessage: null,
        };
      }

      const message: Message = {
        id: streamingMessage.id,
        role: streamingMessage.role,
        content: streamingMessage.content,
        createdAt: streamingMessage.createdAt,
      };

      return {
        messages: [...state.messages, message],
        streamingMessage: null,
        isLoading: false,
      };
    }),

  clear: () =>
    set({
      messages: [],
      streamingMessage: null,
      isLoading: false,
      hasMore: false,
    }),
}));
