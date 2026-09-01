import type { Subject } from "./subject.model.js";

import { subjectRepository } from "./subject.repository.js";

export const subjectProcessor = {
  add: async (subject: Subject) => {
    return subjectRepository.create(subject);
  },

  addMany: async (subjects: Subject[]) => {
    return subjectRepository.createMany(subjects);
  },

  update: async (subject: Subject) => {
    return subjectRepository.update(subject.designerId, subject.id, subject);
  },

  remove: async (designerId: string, id: string) => {
    return subjectRepository.delete(designerId, id);
  },

  removeMany: async (designerId: string, ids: string[]) => {
    return subjectRepository.deleteMany(designerId, ids);
  },
};
