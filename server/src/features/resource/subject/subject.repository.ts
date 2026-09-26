import { BaseRepository } from '#shared/Base/BaseRepository.js';

import { SubjectModel, type Subject } from './subject.model.js';

export class SubjectRepository extends BaseRepository<Subject> {
  constructor() {
    super(SubjectModel);
  }

  async findByCode(code: string) {
    return this.findOne({
      code,
    });
  }

  async findByType(type: Subject['type']) {
    return this.find({
      type,
      status: 'active',
    });
  }
}

export const subjectRepository = new SubjectRepository();
