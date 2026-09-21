import type { Server, Socket } from 'socket.io';

import { asyncSocketHandler } from '../lib/async-socket-handler.js';
import { errors } from '#utils/errors.js';
import { messageService } from '#features/timetable-designer/message/message.service.js';
import { aiService } from '#features/timetable-designer/ai-assistant/ai.service.js';

export const registerMessageListeners = (io: Server, socket: Socket) => {
  socket.on(
    'message:send',
    asyncSocketHandler('message:send', async ({ message }) => {
      aiService.generate(socket.data.user.userId, message.designerId, message);
    }),
  );

  socket.on(
    'message:get',
    asyncSocketHandler('message:get', async ({ designerId, page = 1 }) => {
      return await messageService.get(designerId, page);
    }),
  );
};
