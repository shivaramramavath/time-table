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

export interface SubjectResponse {
  success: boolean;
  data: Subject;
}

export interface SubjectListResponse {
  success: boolean;
  data: Subject[];
}

export class SubjectApi {
  private readonly basePath = '/resources/subjects';

  async create(data: CreateSubjectInput) {
    return httpClient.post<SubjectResponse, CreateSubjectInput>(this.basePath, data);
  }

  async getAll() {
    return httpClient.get<SubjectListResponse>(this.basePath);
  }

  async getById(id: string) {
    return httpClient.get<SubjectResponse>(`${this.basePath}/${id}`);
  }

  async update(id: string, data: UpdateSubjectInput) {
    return httpClient.patch<SubjectResponse, UpdateSubjectInput>(`${this.basePath}/${id}`, data);
  }

  async delete(id: string) {
    return httpClient.delete<SubjectResponse>(`${this.basePath}/${id}`);
  }
}

export const subjectApi = new SubjectApi();
