import type { Faculty } from '../types';
import { useDesignerStore } from '../store/designer.store';
import { facultySocket } from '../socket/faculty.socket';

export const facultyService = {
  getAll: (query = ''): Faculty[] => {
    const faculties = useDesignerStore.getState().getFaculties();

    const search = query.trim().toLowerCase();

    if (!search) {
      return faculties;
    }

    return faculties.filter(
      (faculty) =>
        faculty.name.toLowerCase().includes(search) ||
        faculty.email.toLowerCase().includes(search) ||
        faculty.department?.toLowerCase().includes(search),
    );
  },

  getById: (facultyId: string) => {
    return useDesignerStore.getState().getFaculty(facultyId);
  },

  add: async (faculty: Faculty) => {
    useDesignerStore.getState().addFaculty(faculty);

    facultySocket.create(useDesignerStore.getState().designerId, faculty);

    return faculty;
  },

  update: async (facultyId: string, data: Partial<Faculty>) => {
    useDesignerStore.getState().updateFaculty(facultyId, data);

    facultySocket.update(useDesignerStore.getState().designerId, facultyId, data);

    return data;
  },

  remove: async (facultyId: string) => {
    useDesignerStore.getState().removeFaculty(facultyId);

    facultySocket.delete(useDesignerStore.getState().designerId, facultyId);

    return facultyId;
  },
};
