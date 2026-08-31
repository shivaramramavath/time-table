import { HumanMessage } from "@langchain/core/messages";

import { generateMessageId } from "#utils/generate-ids.js";

import { messageEmitter } from "../message/message.emiter.js";
import { Message } from "../message/message.model.js";
import { messageService } from "../message/message.service.js";
import { designerGraph } from "./graph.js";
import { DesignerGraphState } from "./designer.state.js";

export const aiService = {
  async generate(userId: string, designerId: string, message: Message) {
    const messageId = generateMessageId();

    await messageService.create({
      ...message,
      id: message.id,
      designerId,
      role: "user",
    });

    try {
      let seq = 0;
      let content = "";

      const input: Partial<DesignerGraphState> = {
        userId,
        designerId,
        userQuery: message.content,

        messages: [new HumanMessage(message.content)],
      };

      const stream = await designerGraph.stream(input, {
        streamMode: ["updates", "messages"],
      });

      await messageEmitter.start(userId, {
        messageId,
      });

      for await (const chunk of stream) {
        // console.log(chunk);
        const token = typeof chunk.content === "string" ? chunk.content : "";

        if (!token) continue;

        content += token;

        await messageEmitter.token(userId, {
          messageId,
          content: token,
          seq: seq++,
          timestamp: Date.now(),
        });
      }

      // Save completed assistant message
      await messageService.create({
        id: messageId,
        designerId,
        content,
        role: "assistant",
      });

      // Tell frontend streaming is complete
      await messageEmitter.finish(userId, {
        messageId,
      });
    } catch (error) {
      await messageEmitter.error(userId, {
        messageId,
        message: error instanceof Error ? error.message : "AI execution failed",
      });

      throw error;
    }
  },
};
