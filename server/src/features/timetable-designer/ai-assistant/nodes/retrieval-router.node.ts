import type { DesignerGraphState } from '../designer.state.js';
import { GraphStatus } from '../types.js';

export async function retrievalRouterNode(state: DesignerGraphState) {
  const intent = state.intent;

  if (!intent) {
    return {
      retrievalRoute: 'response' as const,
      status: GraphStatus.RETRIEVING,
    };
  }

  if (
    intent.type === 'query' ||
    intent.requiresRetrieval === true ||
    intent.requiresReferenceResolution === true
  ) {
    return {
      retrievalRoute: 'retrieve' as const,
      status: GraphStatus.RETRIEVING,
    };
  }

  return {
    retrievalRoute: 'response' as const,
    status: GraphStatus.RETRIEVING,
  };
}
