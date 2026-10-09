import { Annotation } from '@langchain/langgraph';

import type { Message } from '../message/message.model.js';

export const DesignerGraphState = Annotation.Root({
  userId: Annotation<string>,
  designerId: Annotation<string>,
  userQuery: Annotation<string>,

  context: Annotation<{
    messages: Message[];
  }>({
    reducer: (_, value) => value,
    default: () => ({
      messages: [],
    }),
  }),

  intent: Annotation<{
    type: 'create' | 'update' | 'delete' | 'query' | 'mixed' | 'unknown';

    entities: ('node' | 'edge' | 'faculty' | 'subject' | 'room')[];

    requiresMutation: boolean;
    requiresRetrieval?: boolean;
    requiresReferenceResolution?: boolean;
    isBulk?: boolean;
    requiresConfirmation?: boolean;
  } | null>({
    reducer: (_, value) => value,
    default: () => null,
  }),

  expandedQuery: Annotation<string>({
    reducer: (_, value) => value,
    default: () => '',
  }),

  retrievalRoute: Annotation<'retrieve' | 'response'>({
    reducer: (_, value) => value,
    default: () => 'response',
  }),

  retrieval: Annotation<Record<string, unknown> | null>({
    reducer: (_, value) => value,
    default: () => null,
  }),

  response: Annotation<string>({
    reducer: (_, value) => value,
    default: () => '',
  }),

  status: Annotation<string>({
    reducer: (_, value) => value,
    default: () => 'thinking',
  }),
});
