import { END, START, StateGraph } from "@langchain/langgraph";

import { DesignerState } from "./designer.state.js";

import { analyzeNode } from "./nodes/analyze.node.js";
import { queryExtenderNode } from "./nodes/query-extender.node.js";
import { responseNode as res } from "./nodes/response.node.js";

const workflow = new StateGraph(DesignerState)
  .addNode("analyze", analyzeNode)
  .addNode("query_extender", queryExtenderNode)
  .addNode("res", res)
  .addEdge(START, "analyze")
  .addEdge("analyze", "query_extender")
  .addEdge("query_extender", "res")
  .addEdge("res", END);

export const designerGraph = workflow.compile();
