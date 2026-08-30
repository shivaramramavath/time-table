import { ChatGroq } from "@langchain/groq";

import { env } from "#configs/env.js";

/*
openai/gpt-oss-20b

openai/gpt-oss-120b

*/

export const groq = new ChatGroq({
  apiKey: env.GROQ_API_KEY,
  model: "openai/gpt-oss-120b",
  temperature: 0.2,
});
