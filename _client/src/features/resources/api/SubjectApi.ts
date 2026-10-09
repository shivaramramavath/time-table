import { httpClient } from '@/shared/api/httpClient.js';

export type SubjectType = 'theory' | 'lab' | 'tutorial';

export type SubjectStatus = 'active' | 'inactive';

export interface Subject {
  id: string;
  code: string;
  name: string;
  type: SubjectType;
  credits: number;
  weeklyPeriods: number;
  department: string;
  semester: number;
  requiresLab: boolean;
  preferredRoomIds: string[];
  status: SubjectStatus;
}

export interface CreateSubjectInput {
  code: string;
  name: string;
  type: SubjectType;
  credits: number;
  weeklyPeriods: number;
  department: string;
  semester: number;
  requiresLab: boolean;
  preferredRoomIds: string[];
  status?: SubjectStatus;
}

export type UpdateSubjectInput = Partial<CreateSubjectInput>;

export class SubjectApi {
  private readonly basePath = '/resources/subject';

  async create(data: CreateSubjectInput) {
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

  async update(id: string, data: UpdateSubjectInput) {
    const { data: response } = await httpClient.patch(`${this.basePath}/${id}`, data);

    return response.data;
  }

  async delete(id: string) {
    const { data: response } = await httpClient.delete(`${this.basePath}/${id}`);

    return response.data;
  }
}

export const subjectApi = new SubjectApi();
