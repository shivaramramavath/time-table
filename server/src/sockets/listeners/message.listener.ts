import type { Socket } from 'socket.io';

import { asyncSocketHandler } from '../handlers/async-socket-handler.js';

import {
  MessageService,
  messageService,
} from '#features/timetable-designer/message/message.service.js';

import { AiService, aiService } from '#features/timetable-designer/ai-assistant/ai.service.js';

export class MessageListener {
  constructor(
    private readonly socket: Socket,
    private readonly messageService: MessageService,
    private readonly aiService: AiService,
  ) {}

  register(): void {
    this.registerSend();
    this.registerGet();
  }

  private registerSend(): void {
    this.socket.on(
      'message:send',
      asyncSocketHandler('message:send', async ({ message }) => {
        // return this.aiService.generate(this.socket.data.user.userId, message.designerId, message);
      }),
    );
  }

  private registerGet(): void {
    this.socket.on(
      'message:get',
      asyncSocketHandler('message:get', async ({ designerId, page = 1 }) => {
        return this.messageService.get(designerId, page);
      }),
    );
  }
}

export const registerMessageListeners = (socket: Socket): MessageListener => {
  const listener = new MessageListener(socket, messageService, aiService);

  listener.register();

  return listener;
};
