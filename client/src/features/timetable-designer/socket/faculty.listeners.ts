import { socketService } from "@/shared/socket/socket.service";

import type { Faculty } from "../types";
import { useDesignerStore } from "../store/designer.store";

export type FacultyAddEvent = Faculty;

export type FacultyUpdateEvent = Faculty;

export interface FacultyDeleteEvent {
  id: string;
}

export const registerFacultyListeners = () => {
  const socket = socketService.getSocket();

  const handleFacultyAdd = (faculty: FacultyAddEvent) => {
    console.log("Faculty added:", faculty.id);

    useDesignerStore.getState().addFaculty(faculty);
  };

  const handleFacultyUpdate = (faculty: FacultyUpdateEvent) => {
    console.log("Faculty updated:", faculty.id);

    useDesignerStore.getState().updateFaculty(faculty.id, faculty);
  };

  const handleFacultyDelete = ({ id }: FacultyDeleteEvent) => {
    console.log("Faculty deleted:", id);

    useDesignerStore.getState().removeFaculty(id);
  };

  socket.on("faculty:add", handleFacultyAdd);

  socket.on("faculty:update", handleFacultyUpdate);

  socket.on("faculty:delete", handleFacultyDelete);

  return () => {
    socket.off("faculty:add", handleFacultyAdd);

    socket.off("faculty:update", handleFacultyUpdate);

    socket.off("faculty:delete", handleFacultyDelete);
  };
};
