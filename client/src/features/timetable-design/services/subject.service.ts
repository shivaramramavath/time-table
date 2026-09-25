import type { Subject } from '../types';
import { useDesignerStore } from '../store/designer.store';
import { subjectSocket } from '../socket/subject.socket';

export const subjectService = {
  getAll: (query = ''): Subject[] => {
    const subjects = useDesignerStore.getState().subjects;

    const search = query.trim().toLowerCase();

    if (!search) {
      return subjects;
    }

    return subjects.filter(
      (subject) =>
        subject.name.toLowerCase().includes(search) || subject.code.toLowerCase().includes(search),
    );
  },

  getById: (subjectId: string) => {
    return useDesignerStore.getState().getSubject(subjectId);
  },

  add: async (subject: Subject) => {
    useDesignerStore.getState().addSubject(subject);

    subjectSocket.create(useDesignerStore.getState().designerId, subject);
    return subject;
  },

  update: async (subjectId: string, subject: Subject) => {
    useDesignerStore.getState().updateSubject(subjectId, subject);

    subjectSocket.update(useDesignerStore.getState().designerId, subjectId, subject);
    return subject;
  },

  remove: async (subjectId: string) => {
    useDesignerStore.getState().removeSubject(subjectId);

    subjectSocket.delete(useDesignerStore.getState().designerId, subjectId);
  },
};
