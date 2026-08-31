import { ChatGroq } from "@langchain/groq";

import { env } from "#configs/env.js";
import { GROQ_LARGE_MODEL, GROQ_SMALL_MODEL } from "#configs/constants.js";

const groqSmall = new ChatGroq({
  apiKey: env.GROQ_API_KEY,
  model: GROQ_SMALL_MODEL,
  temperature: 0,
});

const groqLarge = new ChatGroq({
  apiKey: env.GROQ_API_KEY,
  model: GROQ_LARGE_MODEL,
  temperature: 0,
});

export const llmModels = {
  small: groqSmall,
  large: groqLarge,
};
