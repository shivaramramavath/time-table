import type { Faculty } from '../../types';
import { useDesignerStore } from '../../store/designer.store';

import { registerDesignerListeners } from './register-designer-listeners';

export const registerFacultyListeners = () => {
  const store = useDesignerStore.getState();

  return registerDesignerListeners<Faculty>('faculty', {
    add: (faculty) => {
      store.addFaculty(faculty);
    },

    update: (faculty) => {
      store.updateFaculty(faculty.id, faculty);
    },

    remove: (id) => {
      store.removeFaculty(id);
    },
  });
};
