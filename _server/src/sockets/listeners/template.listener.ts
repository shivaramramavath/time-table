import type { Socket } from 'socket.io';

import { asyncSocketHandler } from '../handlers/async-socket-handler.js';

import { TemplateService, templateService } from '#features/template/template.service.js';

export class TemplateListener {
  constructor(
    private readonly socket: Socket,
    private readonly service: TemplateService,
  ) {}

  register(): void {
    this.registerCreate();
  }

  private registerCreate(): void {
    this.socket.on(
      'template:create',
      asyncSocketHandler('template:create', async (payload) => {
        const { designerId, template } = payload;

        const userId = this.socket.data.user.userId;

        return this.service.create(designerId, {
          userId,
          ...template,
        });
      }),
    );
  }
}

export const registerTemplateListeners = (socket: Socket): TemplateListener => {
  const listener = new TemplateListener(socket, templateService);

  listener.register();

  return listener;
};
