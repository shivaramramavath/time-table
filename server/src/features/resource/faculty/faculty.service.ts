import { facultyCache } from './faculty.cache.js';
import { facultyQueue } from './faculty.queue.js';
import { FacultyRepository } from './faculty.repository.js';

export class FacultyService {
  constructor(private readonly facultyRepository: FacultyRepository) {}
  async create(data: any) {
    const faculty = await this.facultyRepository.create(data);

    await facultyQueue.addFacultyJob({
      facultyId: faculty._id.toString(),
    });

    return faculty;
  }

  async getById(id: string) {
    const cached = await facultyCache.get(id);

    if (cached) {
      return cached;
    }

    const faculty = await this.facultyRepository.findById(id);

    if (!faculty) {
      throw new Error('Faculty not found');
    }

    await facultyCache.set(id, faculty);

    return faculty;
  }

  async getAll(filter = {}) {
    return this.facultyRepository.find(filter);
  }

  async update(id: string, data: any) {
    const faculty = await this.facultyRepository.update(id, data);

    if (!faculty) {
      throw new Error('Faculty not found');
    }

    await facultyCache.delete(id);

    await facultyQueue.addFacultyJob({
      facultyId: id,
    });

    return faculty;
  }

  async delete(id: string) {
    const faculty = await this.facultyRepository.delete(id);

    if (!faculty) {
      throw new Error('Faculty not found');
    }

    await facultyCache.delete(id);

    await facultyQueue.addFacultyJob({
      facultyId: id,
    });

    return faculty;
  }
}

export const facultyService = new FacultyService(new FacultyRepository());
