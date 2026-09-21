import { HumanMessage } from '@langchain/core/messages';

import { generateMessageId } from '#utils/generate-ids.js';

import { messageEmitter } from '../message/message.emiter.js';
import { Message } from '../message/message.model.js';
import { messageService } from '../message/message.service.js';

import { designerGraph } from './graph.js';
import type { DesignerGraphState } from './designer.state.js';
import { GraphUpdate, MessageChunkMetadata } from './types.js';

export const aiService = {
  async generate(userId: string, designerId: string, message: Message) {
    const messageId = generateMessageId();

    await messageService.create({
      ...message,
      id: message.id,
      designerId,
      role: 'user',
    });

    try {
      let seq = 0;
      let content = '';

      await messageEmitter.start(userId, {
        messageId,
      });

      await messageEmitter.status(userId, {
        messageId,
        status: 'thinking',
      });

      const input: Partial<DesignerGraphState> = {
        userId,
        designerId,
        userQuery: message.content,
        messages: [new HumanMessage(message.content)],
      };

      const stream = await designerGraph.stream(input, {
        streamMode: ['updates', 'messages'],
        configurable: {
          thread_id: designerId,
        },
      });

      for await (const chunk of stream) {
        const [mode, data] = chunk;

        if (mode === 'messages') {
          const [messageChunk, metadata] = data as [
            {
              content: unknown;
            },
            MessageChunkMetadata,
          ];

          await this.handleTokenChunk(userId, messageId, messageChunk, metadata, (token) => {
            content += token;
            return seq++;
          });

          continue;
        }

        if (mode === 'updates') {
          await this.handleGraphUpdate(userId, messageId, data as GraphUpdate);

          continue;
        }
      }

      await messageService.create({
        id: messageId,
        designerId,
        content,
        role: 'assistant',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await messageEmitter.finish(userId, {
        messageId,
      });
    } catch (error) {
      console.error('catch', error);
      await messageEmitter.error(userId, {
        message: error instanceof Error ? error.message : 'AI execution failed',
      });

      throw error;
    }
  },

  async handleTokenChunk(
    userId: string,
    messageId: string,
    messageChunk: {
      content: unknown;
    },
    metadata: MessageChunkMetadata,
    getSequence: (token: string) => number,
  ) {
    if (metadata.langgraph_node !== 'ai-response') {
      return;
    }

    const token = messageChunk.content;

    if (typeof token !== 'string' || token.length === 0) {
      return;
    }

    await messageEmitter.token(userId, {
      messageId,

      content: token,

      seq: getSequence(token),

      timestamp: Date.now(),
    });
  },

  async handleGraphUpdate(userId: string, messageId: string, update: GraphUpdate) {
    console.log('Graph update:', update);

    for (const [nodeName, nodeUpdate] of Object.entries(update)) {
      const status = nodeUpdate?.status;

      if (!status) {
        continue;
      }

      console.log(`Graph node "${nodeName}" status:`, status);

      await messageEmitter.status(userId, {
        messageId,
        status: status,
      });
    }
  },
};
