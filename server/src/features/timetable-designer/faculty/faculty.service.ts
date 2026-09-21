import { Faculty } from './faculty.model.js';
import { facultyCache } from './faculty.cache.js';

export const facultyService = {
  getById: async (designerId: string, id: string) => {
    return facultyCache.getById(designerId, id);
  },

  getAll: async (designerId: string) => {
    return facultyCache.getAll(designerId);
  },

  create: async (designerId: string, data: Faculty) => {
    return facultyCache.create(designerId, data);
  },

  update: async (designerId: string, id: string, data: Partial<Faculty>) => {
    return facultyCache.updateById(designerId, id, data);
  },

  delete: async (designerId: string, id: string) => {
    return facultyCache.deleteById(designerId, id);
  },
};
