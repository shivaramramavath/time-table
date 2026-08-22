import { create } from "zustand";

import type { Message } from "../types";

interface MessageState {
  messages: Message[];
  isLoading: boolean;
  hasMore: boolean;
  streamingMessageId: string | null;

  send: (msg: Message) => void;
  setHasMore: (hasMore: boolean) => void;
  receive: (msg: Message) => void;
  prependMany: (messages: Message[]) => void;
  update: (id: string, content: string, seq: number, timestamp: number) => void;
  start: (messageId: string) => void;
  finish: (messageId?: string) => void;
  clear: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  isLoading: false,
  hasMore: false,
  streamingMessageId: null,

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

  update: (id, content, seq, timestamp) =>
    set((state) => ({
      messages: state.messages.map((message) => {
        if (message.id !== id) {
          return message;
        }

        if (message.seq !== undefined && seq <= message.seq) {
          return message;
        }

        return {
          ...message,
          content: message.content + content,
          seq,
          createdAt: new Date(timestamp).toISOString(),
        };
      }),
    })),

  start: (messageId) =>
    set((state) => {
      const exists = state.messages.some((message) => message.id === messageId);

      return {
        messages: exists
          ? state.messages
          : [
              ...state.messages,
              {
                id: messageId,
                role: "assistant",
                content: "",
                createdAt: new Date().toISOString(),
              },
            ],
        isLoading: true,
        streamingMessageId: messageId,
      };
    }),

  finish: (messageId) =>
    set((state) => ({
      isLoading: false,
      streamingMessageId:
        state.streamingMessageId === messageId
          ? null
          : state.streamingMessageId,
    })),

  clear: () =>
    set({
      messages: [],
      isLoading: false,
      streamingMessageId: null,
    }),
}));
