import type { Room } from '../types';
import { useDesignerStore } from '../store/designer.store';
import { roomSocket } from '../socket/room.socket';

export const roomService = {
  getAll: (query = ''): Room[] => {
    const rooms = useDesignerStore.getState().getRooms();

    const search = query.trim().toLowerCase();

    if (!search) {
      return rooms;
    }

    return rooms.filter(
      (room) =>
        room.name.toLowerCase().includes(search) || room.roomNumber.toLowerCase().includes(search),
    );
  },

  getById: (roomId: string) => {
    return useDesignerStore.getState().getRoom(roomId);
  },

  add: async (room: Room) => {
    useDesignerStore.getState().addRoom(room);

    roomSocket.create(useDesignerStore.getState().designerId, room);
    return room;
  },

  update: async (roomId: string, roomData: Room) => {
    useDesignerStore.getState().updateRoom(roomId, roomData);

    roomSocket.update(useDesignerStore.getState().designerId, roomId, roomData);
    return roomData;
  },

  remove: async (roomId: string) => {
    useDesignerStore.getState().removeRoom(roomId);

    roomSocket.delete(useDesignerStore.getState().designerId, roomId);
  },
};
