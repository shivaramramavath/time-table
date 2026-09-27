import type { FilterQuery } from 'mongoose';

import type { Faculty } from './faculty.model.js';
import { facultyCache, FacultyCache } from './faculty.cache.js';
import { facultyRepository, FacultyRepository } from './faculty.repository.js';

export interface FacultyFilter {
  name?: string;
  department?: string;
  status?: Faculty['status'];
}

export class FacultyService {
  constructor(
    private readonly facultyRepository: FacultyRepository,
    private readonly facultyCache: FacultyCache,
  ) {}

  async getById(id: string) {
    const cached = await this.facultyCache.get(id);

    if (cached) {
      return cached;
    }

    const faculty = await this.facultyRepository.findById(id);

    if (!faculty) {
      throw new Error('Faculty not found');
    }

    await this.facultyCache.set(id, faculty);

    return faculty;
  }

  async getAll(filter: FacultyFilter = {}) {
    const query: FilterQuery<Faculty> = {};

    if (filter.name) {
      query.name = {
        $regex: filter.name,
        $options: 'i',
      };
    }

    if (filter.department) {
      query.department = filter.department;
    }

    if (filter.status) {
      query.status = filter.status;
    }

    return this.facultyRepository.find(query);
  }

  async create(data: Omit<Faculty, 'id'>) {
    const faculty = await this.facultyRepository.create({
      ...data,
      id: crypto.randomUUID(),
    });

    await this.facultyCache.set(faculty.id.toString(), faculty);

    return faculty;
  }

  async update(id: string, data: Partial<Faculty>) {
    const faculty = await this.facultyRepository.update(id, data);

    if (!faculty) {
      throw new Error('Faculty not found');
    }

    await this.facultyCache.set(id, faculty);

    return faculty;
  }

  async delete(id: string) {
    const faculty = await this.facultyRepository.delete(id);

    if (!faculty) {
      throw new Error('Faculty not found');
    }

    await this.facultyCache.delete(id);

    return faculty;
  }
}

export const facultyService = new FacultyService(facultyRepository, facultyCache);
