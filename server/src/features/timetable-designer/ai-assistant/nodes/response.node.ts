import { SystemMessage } from "@langchain/core/messages";

import { llmModels } from "../services/groq.config.js";
import type { DesignerGraphState } from "../designer.state.js";
import { GraphStatus } from "../types.js";

export async function responseNode(state: DesignerGraphState) {
  const prompt = `
You are the final assistant for a timetable designer.

Answer the user's request using the provided context.

Rules:
- Be concise.
- Do not invent data.
- Do not invent IDs.
- Do not claim that a mutation happened unless execution results confirm it.
- If no relevant data exists, clearly say so.
- For a simple conversation, respond naturally.

User request:
${state.userQuery}

Expanded query:
${state.expandedQuery}

Intent:
${JSON.stringify(state.intent, null, 2)}

Retrieved data:
${JSON.stringify(state.retrieval, null, 2)}

Execution results:
${JSON.stringify(state.results ?? [], null, 2)}

Verification:
${JSON.stringify(state.verification ?? null, null, 2)}
`;

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
