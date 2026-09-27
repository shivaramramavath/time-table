import mongoose from 'mongoose';
import { facultyCache } from './faculty.cache.js';
import { facultyQueue } from './faculty.queue.js';
import { FacultyRepository } from './faculty.repository.js';
import { Faculty } from './faculty.model.js';

export class FacultyService {
  constructor(private readonly facultyRepository: FacultyRepository) {}
  async create(data: any) {
    const faculty = await this.facultyRepository.create({
      ...data,
      id: new mongoose.Types.ObjectId(),
    });

    await facultyQueue.addFacultyJob({
      facultyId: faculty.id.toString(),
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

  async getAll(filter) {
    return this.facultyRepository.find({
      name: {
        $regex: filter.name,
        $options: 'i',
      },
    });
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
