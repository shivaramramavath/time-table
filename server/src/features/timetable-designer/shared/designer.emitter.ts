import { emitToUser } from '../../../sockets/emit-to-user.js';

export type DesignerEmitter<T extends { id: string }> = {
  add(userId: string, entity: T): Promise<void>;

  update(userId: string, entity: T): Promise<void>;

  delete(userId: string, entity: Pick<T, 'id'>): Promise<void>;
};

export const createDesignerEmitter = <T extends { id: string }>(
  resource: string,
): DesignerEmitter<T> => ({
  add: (userId, entity) => emitToUser(userId, `${resource}:add`, entity),

  update: (userId, entity) => emitToUser(userId, `${resource}:update`, entity),

  delete: (userId, { id }) => emitToUser(userId, `${resource}:delete`, { id }),
});
