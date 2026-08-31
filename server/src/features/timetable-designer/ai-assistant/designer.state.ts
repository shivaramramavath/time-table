import { Annotation } from "@langchain/langgraph";
import type { BaseMessage } from "@langchain/core/messages";

import type { DesignerContext, Intent, Plan, ToolResult } from "./types.js";

export const DesignerState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (left, right) => [...left, ...right],
    default: () => [],
  }),

  userQuery: Annotation<string>({
    reducer: (_, value) => value,
    default: () => "",
  }),

  userId: Annotation<string>({
    reducer: (_, value) => value,
    default: () => "",
  }),

  timetableId: Annotation<string>({
    reducer: (_, value) => value,
    default: () => "",
  }),

  designerId: Annotation<string>({
    reducer: (_, value) => value,
    default: () => "",
  }),

  intent: Annotation<Intent | undefined>({
    reducer: (_, value) => value,
    default: () => undefined,
  }),

  expandedQuery: Annotation<string>({
    reducer: (_, value) => value,
    default: () => "",
  }),

  context: Annotation<DesignerContext>({
    reducer: (oldValue, newValue) => ({
      ...oldValue,
      ...newValue,
    }),
    default: () => ({}),
  }),

  plan: Annotation<Plan | undefined>({
    reducer: (_, value) => value,
    default: () => undefined,
  }),

  results: Annotation<ToolResult[]>({
    reducer: (left, right) => [...left, ...right],
    default: () => [],
  }),

  errors: Annotation<string[]>({
    reducer: (left, right) => [...left, ...right],
    default: () => [],
  }),

  currentStep: Annotation<number>({
    reducer: (_, value) => value,
    default: () => 0,
  }),

  response: Annotation<string>({
    reducer: (_, value) => value,
    default: () => "",
  }),

  requiresApproval: Annotation<boolean>({
    reducer: (_, value) => value,
    default: () => false,
  }),

  verification: Annotation<
    | {
        success: boolean;
        message?: string;
      }
    | undefined
  >({
    reducer: (_, value) => value,
    default: () => undefined,
  }),
});

export type DesignerGraphState = typeof DesignerState.State;
