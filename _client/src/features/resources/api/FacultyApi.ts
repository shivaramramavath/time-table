import { httpClient } from '@/shared/api/httpClient.js';

export interface Faculty {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
  subjectIds: string[];
  roomId: string;
  maxPerDay: number;
  maxPerWeek: number;
  availability: boolean[][];
  status: 'active' | 'inactive';
}

export interface CreateFacultyInput {
  name: string;
  email: string;
  employeeId: string;
  department: string;
  subjectIds: string[];
  roomId: string;
  maxPerDay: number;
  maxPerWeek: number;
  availability: boolean[][];
  status?: 'active' | 'inactive';
}

export type UpdateFacultyInput = Partial<CreateFacultyInput>;

export class FacultyApi {
  private readonly basePath = '/resources/faculty';

  async create(data: CreateFacultyInput) {
    const { data: response } = await httpClient.post(this.basePath, data);

    return response.data;
  }

  async getAll(query = '') {
    const { data: response } = await httpClient.get(this.basePath, {
      params: {
        name: query || undefined,
      },
    });

    return response.data;
  }

  async getById(id: string) {
    const { data: response } = await httpClient.get(`${this.basePath}/${id}`);

    return response.data;
  }

  async update(id: string, data: UpdateFacultyInput) {
    const { data: response } = await httpClient.patch(`${this.basePath}/${id}`, data);

    return response.data;
  }

  async delete(id: string) {
    const { data: response } = await httpClient.delete(`${this.basePath}/${id}`);

    return response.data;
  }
}

export const facultyApi = new FacultyApi();
