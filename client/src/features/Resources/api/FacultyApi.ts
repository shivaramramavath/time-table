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

export interface FacultyResponse {
  success: boolean;
  data: Faculty;
}

export interface FacultyListResponse {
  success: boolean;
  data: Faculty[];
}

export class FacultyApi {
  private readonly basePath = '/resources/faculty';

  async create(data: CreateFacultyInput) {
    return httpClient.post<FacultyResponse, CreateFacultyInput>(this.basePath, data);
  }

  async getAll() {
    return httpClient.get<FacultyListResponse>(this.basePath);
  }

  async getById(id: string) {
    return httpClient.get<FacultyResponse>(`${this.basePath}/${id}`);
  }

  async update(id: string, data: UpdateFacultyInput) {
    return httpClient.patch<FacultyResponse, UpdateFacultyInput>(`${this.basePath}/${id}`, data);
  }

  async delete(id: string) {
    return httpClient.delete<FacultyResponse>(`${this.basePath}/${id}`);
  }
}

export const facultyApi = new FacultyApi();
