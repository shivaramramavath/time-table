import { socketService } from "@/shared/socket/socket.service";

import type { Room } from "../types";
import { useDesignerStore } from "../store/designer.store";

export type RoomAddEvent = Room;

export type RoomUpdateEvent = Room;

export interface RoomDeleteEvent {
  id: string;
}

export const registerRoomListeners = () => {
  const socket = socketService.getSocket();

  const handleRoomAdd = (room: RoomAddEvent) => {
    console.log("Room added:", room.id);

    useDesignerStore.getState().addRoom(room);
  };

  const handleRoomUpdate = (room: RoomUpdateEvent) => {
    console.log("Room updated:", room.id);

    useDesignerStore.getState().updateRoom(room.id, room);
  };

  const handleRoomDelete = ({ id }: RoomDeleteEvent) => {
    console.log("Room deleted:", id);

    useDesignerStore.getState().removeRoom(id);
  };

  socket.on("room:add", handleRoomAdd);
  socket.on("room:update", handleRoomUpdate);
  socket.on("room:delete", handleRoomDelete);

  return () => {
    socket.off("room:add", handleRoomAdd);
    socket.off("room:update", handleRoomUpdate);
    socket.off("room:delete", handleRoomDelete);
  };
};
