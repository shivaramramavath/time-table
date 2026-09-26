import type { Subject } from './subject.model.js';
import { subjectCache } from './subject.cache.js';
import { SubjectRepository, subjectRepository } from './subject.repository.js';

export class SubjectService {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  async getById(designerId: string, id: string) {
    return this.subjectCache.getById(designerId, id);
  }

  async getAll(designerId: string) {
    return this.subjectCache.getAll(designerId);
  }

  async create(designerId: string, data: Subject) {
    const subject: Subject = {
      ...data,
      designerId,
      id: crypto.randomUUID(),
    };

    return this.subjectCache.create(designerId, subject);
  }

  async update(designerId: string, id: string, data: Partial<Subject>) {
    return this.subjectCache.updateById(designerId, id, data);
  }

  async delete(designerId: string, id: string) {
    return this.subjectCache.deleteById(designerId, id);
  }
}

export const subjectService = new SubjectService(subjectRepository);
