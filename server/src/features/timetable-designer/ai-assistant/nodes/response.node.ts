import { SystemMessage } from "@langchain/core/messages";

import { llmModels } from "../services/groq.config.js";
import type { DesignerGraphState } from "../designer.state.js";
import { GraphStatus } from "../types.js";

import { responsePrompt } from "../prompts/response.prompt.js";

export async function responseNode(state: DesignerGraphState) {
  const prompt = responsePrompt({
    userQuery: state.userQuery,
    results: state.results,
    verification: state.verification,
  });

  const response = await llmModels.small.invoke([new SystemMessage(prompt)]);

  const content =
    typeof response.content === "string"
      ? response.content
      : JSON.stringify(response.content);

  return {
    response: content,

    status: GraphStatus.RESPONDING,
  };
}
