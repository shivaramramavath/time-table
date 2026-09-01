import type { Room } from "../../types";
import { useDesignerStore } from "../../store/designer.store";

import { registerDesignerListeners } from "./register-designer-listeners";

export const registerRoomListeners = () => {
  const store = useDesignerStore.getState();

  return registerDesignerListeners<Room>("room", {
    add: (room) => {
      store.addRoom(room);
    },

    update: (room) => {
      store.updateRoom(room.id, room);
    },

    remove: (id) => {
      store.removeRoom(id);
    },
  });
};
