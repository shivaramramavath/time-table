import mongoose from 'mongoose';

import type { Subject } from './subject.model.js';
import { SubjectRepository, subjectRepository } from './subject.repository.js';

export class SubjectService {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  async getById(id: string) {
    return this.subjectRepository.findById(id);
  }

  async getAll() {
    return this.subjectRepository.find();
  }

  async create(data: Subject) {
    const subject: Subject = {
      ...data,
      id: new mongoose.Types.ObjectId(),
    };

    return this.subjectRepository.create(subject);
  }

  async update(id: string, data: Partial<Subject>) {
    return this.subjectRepository.update(id, data);
  }

  async delete(id: string) {
    return this.subjectRepository.delete(id);
  }
}

export const subjectService = new SubjectService(subjectRepository);
