import type { Faculty } from './faculty.model.js';

import { facultyRepository } from './faculty.repository.js';

export const facultyProcessor = {
  add: async (faculty: Faculty) => {
    return facultyRepository.create(faculty);
  },

  addMany: async (faculties: Faculty[]) => {
    return facultyRepository.createMany(faculties);
  },

  update: async (faculty: Faculty) => {
    return facultyRepository.update(faculty.designerId, faculty.id, faculty);
  },

  remove: async (designerId: string, id: string) => {
    return facultyRepository.delete(designerId, id);
  },

  removeMany: async (designerId: string, ids: string[]) => {
    return facultyRepository.deleteMany(designerId, ids);
  },
};
