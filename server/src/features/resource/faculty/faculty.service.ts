import { facultyCache } from './faculty.cache.js';

import { facultyQueue } from './faculty.queue.js';

import { facultyRepository } from './faculty.repository.js';

export class FacultyService {
  async create(data: any) {
    const faculty = await facultyRepository.create(data);

    await facultyQueue.addFacultyJob({
      facultyId: faculty._id.toString(),
      action: 'created',
    });

    return faculty;
  }

  async getById(id: string) {
    const cached = await facultyCache.get(id);

    if (cached) {
      return cached;
    }

    const faculty = await facultyRepository.findById(id);

    if (!faculty) {
      throw new Error('Faculty not found');
    }

    await facultyCache.set(id, faculty);

    return faculty;
  }

  async getAll(filter = {}) {
    return facultyRepository.find(filter);
  }

  async update(id: string, data: any) {
    const faculty = await facultyRepository.update(id, data);

    if (!faculty) {
      throw new Error('Faculty not found');
    }

    await facultyCache.delete(id);

    await facultyQueue.addFacultyJob({
      facultyId: id,
      action: 'updated',
    });

    return faculty;
  }

  async delete(id: string) {
    const faculty = await facultyRepository.delete(id);

    if (!faculty) {
      throw new Error('Faculty not found');
    }

    await facultyCache.delete(id);

    await facultyQueue.addFacultyJob({
      facultyId: id,
      action: 'deleted',
    });

    return faculty;
  }
}

export const facultyService = new FacultyService();
