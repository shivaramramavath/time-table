import { SystemMessage } from "@langchain/core/messages";

import { llmModels } from "../services/groq.config.js";
import { DesignerGraphState } from "../designer.state.js";

export async function responseNode(state: DesignerGraphState) {
  const prompt = `
You are the final assistant for a timetable designer.

Respond concisely.

User:
${state.userQuery}

Execution results:
${JSON.stringify(state.results)}

Verification:
${JSON.stringify(state.verification)}

If successful, describe what was changed.

Do not claim a mutation succeeded if verification failed.
`;

  const response = await llmModels.small.invoke([new SystemMessage(prompt)]);

  console.log("Response:", response.content);
  
  return {
    response:
      typeof response.content === "string"
        ? response.content
        : JSON.stringify(response.content),
  };
}
