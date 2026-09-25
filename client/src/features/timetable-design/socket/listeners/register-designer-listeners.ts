import { socketService } from '@/shared/socket/socket.service';

import type { DeleteEvent } from './designer-socket.types';

interface ListenerAdapter<T> {
  add: (entity: T) => void;
  update: (entity: T) => void;
  remove: (id: string) => void;
}

export const registerDesignerListeners = <T extends { id: string }>(
  resource: string,
  adapter: ListenerAdapter<T>,
) => {
  const socket = socketService.getSocket();

  const addEvent = `${resource}:add`;
  const updateEvent = `${resource}:update`;
  const deleteEvent = `${resource}:delete`;

  const handleAdd = (entity: T) => {
    adapter.add(entity);
  };

  const handleUpdate = (entity: T) => {
    adapter.update(entity);
  };

  const handleDelete = ({ id }: DeleteEvent) => {
    adapter.remove(id);
  };

  socket.on(addEvent, handleAdd);
  socket.on(updateEvent, handleUpdate);
  socket.on(deleteEvent, handleDelete);

  return () => {
    socket.off(addEvent, handleAdd);
    socket.off(updateEvent, handleUpdate);
    socket.off(deleteEvent, handleDelete);
  };
};
