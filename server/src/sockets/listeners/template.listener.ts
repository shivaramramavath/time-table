import type { Server, Socket } from 'socket.io';

import { asyncSocketHandler } from '../lib/async-socket-handler.js';
import { templateService } from '#features/template/template.dependency.js';

export const registerTemplateListeners = (io: Server, socket: Socket) => {
  socket.on(
    'template:create',
    asyncSocketHandler('template:create', async (payload) => {
      const { designerId, template } = payload;
      const userId = socket.data.user.userId;
      await templateService.create(designerId, {
        userId,
        ...template,
      });
    }),
  );
};
