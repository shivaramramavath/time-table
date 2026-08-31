import { SystemMessage } from "@langchain/core/messages";

import { llmModels } from "../services/groq.config.js";
import type { DesignerGraphState } from "../designer.state.js";

export async function queryExtenderNode(state: DesignerGraphState) {
  const prompt = `
Resolve references in the user's request.

Use:
- conversation messages
- timetable ID
- available context
- previously retrieved entities

Resolve phrases such as:
"that node"
"the existing ML subject"
"same room"
"him"
"that faculty"

User:
${state.userQuery}

Current context:
${JSON.stringify(state.context)}

Return an expanded, explicit query.
`;

  const response = await llmModels.small.invoke([new SystemMessage(prompt)]);

  console.log("Expanded query:", response.content);

  return {
    expandedQuery:
      typeof response.content === "string"
        ? response.content
        : JSON.stringify(response.content),
  };
}
