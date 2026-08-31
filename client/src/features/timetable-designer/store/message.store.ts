import { create } from "zustand";

import type { Message } from "../types";

export type AIStatus =
  | "thinking"
  | "analyzing"
  | "understanding"
  | "retrieving"
  | "planning"
  | "validating"
  | "executing"
  | "verifying"
  | "responding";

export interface MessageStatusEvent {
  messageId: string;
  status: AIStatus;
}

interface StreamingMessage {
  id: string;
  role: "assistant";
  content: string;
  seq?: number;
  createdAt: string;

  status: AIStatus;
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

  setStatus: (event: MessageStatusEvent) => void;

  update: (data: { content: string; seq: number; timestamp: number }) => void;

  finish: (messageId?: string) => void;

  error: (messageId: string, message?: string) => void;

  clear: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  streamingMessage: null,

  isLoading: false,
  hasMore: false,

  // Normal messages

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

  // AI START

  start: (messageId) =>
    set({
      streamingMessage: {
        id: messageId,

        role: "assistant",

        content: "",

        createdAt: new Date().toISOString(),

        status: "thinking",
      },

      isLoading: true,
    }),

  // AI STATUS

  setStatus: ({ messageId, status }) =>
    set((state) => {
      const streamingMessage = state.streamingMessage;

      if (!streamingMessage) {
        return state;
      }

      // Ignore status events belonging
      // to another AI run.
      if (streamingMessage.id !== messageId) {
        return state;
      }

      return {
        streamingMessage: {
          ...streamingMessage,

          status,
        },
      };
    }),

  // AI TOKEN

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

  // AI FINISH

  finish: (messageId) =>
    set((state) => {
      const streamingMessage = state.streamingMessage;

      if (!streamingMessage) {
        return {
          isLoading: false,
          streamingMessage: null,
        };
      }

      if (messageId && streamingMessage.id !== messageId) {
        return state;
      }

      const message: Message = {
        id: streamingMessage.id,

        role: "assistant",

        content: streamingMessage.content,

        createdAt: streamingMessage.createdAt,
      };

      return {
        messages: [...state.messages, message],

        streamingMessage: null,

        isLoading: false,
      };
    }),

  // AI ERROR

  error: (messageId, message = "Something went wrong.") =>
    set((state) => {
      const streamingMessage = state.streamingMessage;

      if (!streamingMessage || streamingMessage.id !== messageId) {
        return state;
      }

      return {
        streamingMessage: {
          ...streamingMessage,

          statusMessage: message,
        },

        isLoading: false,
      };
    }),

  // CLEAR

  clear: () =>
    set({
      messages: [],

      streamingMessage: null,

      isLoading: false,

      hasMore: false,
    }),
}));
