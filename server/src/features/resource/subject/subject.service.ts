import { subjectCache } from './subject.cache..js';
import { Subject } from './subject.model.js';

export const subjectService = {
  getById: async (designerId: string, id: string) => {
    return subjectCache.getById(designerId, id);
  },

  getAll: async (designerId: string) => {
    return subjectCache.getAll(designerId);
  },

  create: async (designerId: string, data: Subject) => {
    return subjectCache.create(designerId, data);
  },

  update: async (designerId: string, id: string, data: Partial<Subject>) => {
    return subjectCache.updateById(designerId, id, data);
  },

  delete: async (designerId: string, id: string) => {
    return subjectCache.deleteById(designerId, id);
  },
};
