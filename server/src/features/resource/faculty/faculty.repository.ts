import { BaseRepository } from '#shared/repository/BaseRepository.js';

import { FacultyModel, type Faculty } from './faculty.model.js';

export class FacultyRepository extends BaseRepository<Faculty> {
  constructor() {
    super(FacultyModel);
  }

  async findByEmployeeId(employeeId: string) {
    return this.findOne({
      employeeId,
    });
  }

  async findByDepartment(department: string) {
    return this.find({
      department,
      status: 'active',
    });
  }
}

export const facultyRepository = new FacultyRepository();
