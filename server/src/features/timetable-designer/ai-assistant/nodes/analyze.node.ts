import { SystemMessage } from "@langchain/core/messages";

import { llmModels } from "../services/groq.config.js";
import type { DesignerGraphState } from "../designer.state.js";

export async function analyzeNode(state: DesignerGraphState) {
  const prompt = `
You are an intent classifier for a timetable designer.

Determine:

1. operation type
2. entities involved
3. whether the request mutates data

Allowed entities:
node, edge, faculty, subject, room

Allowed operations:
create, update, delete, query, mixed, unknown

User request:
${state.userQuery}

Return JSON only:

{
  "type": "...",
  "entities": [],
  "requiresMutation": true
}
`;

  const response = await llmModels.small.invoke([new SystemMessage(prompt)]);

  console.log("Intent:", response.content);

  const text =
    typeof response.content === "string"
      ? response.content
      : JSON.stringify(response.content);

  const intent = JSON.parse(text);

  return {
    intent,
  };
}
