import { socketService } from "@/shared/socket/socket.service";

import type { Subject } from "../types";
import { useDesignerStore } from "../store/designer.store";

export type SubjectAddEvent = Subject;

export type SubjectUpdateEvent = Subject;

export interface SubjectDeleteEvent {
  id: string;
}

export const registerSubjectListeners = () => {
  const socket = socketService.getSocket();

  const handleSubjectAdd = (subject: SubjectAddEvent) => {
    console.log("Subject added:", subject.id);

    useDesignerStore.getState().addSubject(subject);
  };

  const handleSubjectUpdate = (subject: SubjectUpdateEvent) => {
    console.log("Subject updated:", subject.id);

    useDesignerStore.getState().updateSubject(subject.id, subject);
  };

  const handleSubjectDelete = ({ id }: SubjectDeleteEvent) => {
    console.log("Subject deleted:", id);

    useDesignerStore.getState().removeSubject(id);
  };

  socket.on("subject:add", handleSubjectAdd);

  socket.on("subject:update", handleSubjectUpdate);

  socket.on("subject:delete", handleSubjectDelete);

  return () => {
    socket.off("subject:add", handleSubjectAdd);

    socket.off("subject:update", handleSubjectUpdate);

    socket.off("subject:delete", handleSubjectDelete);
  };
};
