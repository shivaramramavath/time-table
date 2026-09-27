import { httpClient } from '@/shared/api/httpClient.js';

export type RoomType = 'classroom' | 'lab' | 'seminar' | 'auditorium' | 'facultyRoom';

export type RoomStatus = 'available' | 'unavailable' | 'maintenance';

export interface Room {
  id: string;
  name: string;
  code: string;
  type: RoomType;
  capacity: number;
  building?: string;
  floor?: number;
  facilities: string[];
  status: RoomStatus;
}

export interface CreateRoomInput {
  name: string;
  code: string;
  type: RoomType;
  capacity: number;
  building?: string;
  floor?: number;
  facilities: string[];
  status?: RoomStatus;
}

export type UpdateRoomInput = Partial<CreateRoomInput>;

export class RoomApi {
  private readonly basePath = '/resources/room';

  async create(data: CreateRoomInput) {
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

  async update(id: string, data: UpdateRoomInput) {
    const { data: response } = await httpClient.patch(`${this.basePath}/${id}`, data);

    return response.data;
  }

  async delete(id: string) {
    const { data: response } = await httpClient.delete(`${this.basePath}/${id}`);

    return response.data;
  }
}

export const roomApi = new RoomApi();
