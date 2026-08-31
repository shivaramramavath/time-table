import { SystemMessage } from "@langchain/core/messages";

import { llmModels } from "../services/groq.config.js";
import type { DesignerGraphState } from "../designer.state.js";
import { GraphStatus } from "../types.js";

import { queryExtenderPrompt } from "../prompts/query-extender.prompt.js";

export async function queryExtenderNode(state: DesignerGraphState) {
  const prompt = queryExtenderPrompt({
    userQuery: state.userQuery,
    context: state.context,
  });

  const response = await llmModels.small.invoke([new SystemMessage(prompt)]);

  const expandedQuery =
    typeof response.content === "string"
      ? response.content
      : JSON.stringify(response.content);

  return {
    expandedQuery,

    status: GraphStatus.UNDERSTANDING,
  };
}
