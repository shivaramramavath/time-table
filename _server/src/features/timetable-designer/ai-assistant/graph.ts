import { END, START, StateGraph } from '@langchain/langgraph';

import { DesignerGraphState } from './designer.state.js';

import { analyzeNode } from './nodes/analyze.node.js';
import { loadContextNode } from './nodes/load-context.node.js';
import { queryExtenderNode } from './nodes/query-extender.node.js';
import { responseNode } from './nodes/response.node.js';
import { retrievalRouterNode } from './nodes/retrieval-router.node.js';
import { retrieveNode } from './nodes/retrieve.node.js';

const workflow = new StateGraph(DesignerGraphState)
  .addNode('load_context', loadContextNode)
  .addNode('analyze', analyzeNode)
  .addNode('query_extender', queryExtenderNode)
  .addNode('retrieval_router', retrievalRouterNode)
  .addNode('retrieve', retrieveNode)
  .addNode('ai-response', responseNode)

  .addEdge(START, 'load_context')
  .addEdge('load_context', 'analyze')
  .addEdge('analyze', 'query_extender')
  .addEdge('query_extender', 'retrieval_router')

  .addConditionalEdges('retrieval_router', (state) => state.retrievalRoute, {
    retrieve: 'retrieve',
    response: 'ai-response',
  })

  .addEdge('retrieve', 'ai-response')
  .addEdge('ai-response', END);

export const designerGraph = workflow.compile();
