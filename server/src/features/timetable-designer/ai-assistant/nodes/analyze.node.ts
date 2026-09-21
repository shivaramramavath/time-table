import { SystemMessage } from '@langchain/core/messages';

import { llmModels } from '../services/groq.config.js';
import type { DesignerGraphState } from '../designer.state.js';
import { GraphStatus } from '../types.js';

import { analyzePrompt } from '../prompts/analyze.prompt.js';

export async function analyzeNode(state: DesignerGraphState) {
  const prompt = analyzePrompt(state.userQuery, state.context.messages);

  const response = await llmModels.small.invoke([new SystemMessage(prompt)]);

  const text =
    typeof response.content === 'string' ? response.content : JSON.stringify(response.content);

  const intent = JSON.parse(text);

  return {
    intent,
    status: GraphStatus.ANALYZING,
  };
}
