import type { Subject } from '../../types';
import { useDesignerStore } from '../../store/designer.store';

import { registerDesignerListeners } from './register-designer-listeners';

export const registerSubjectListeners = () => {
  const store = useDesignerStore.getState();

  return registerDesignerListeners<Subject>('subject', {
    add: (subject) => {
      store.addSubject(subject);
    },

    update: (subject) => {
      store.updateSubject(subject.id, subject);
    },

    remove: (id) => {
      store.removeSubject(id);
    },
  });
};
