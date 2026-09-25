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

export interface RoomResponse {
  success: boolean;
  data: Room;
}

export interface RoomListResponse {
  success: boolean;
  data: Room[];
}

export class RoomApi {
  private readonly basePath = '/resources/rooms';

  async create(data: CreateRoomInput) {
    return httpClient.post<RoomResponse, CreateRoomInput>(this.basePath, data);
  }

  async getAll() {
    return httpClient.get<RoomListResponse>(this.basePath);
  }

  async getById(id: string) {
    return httpClient.get<RoomResponse>(`${this.basePath}/${id}`);
  }

  async update(id: string, data: UpdateRoomInput) {
    return httpClient.patch<RoomResponse, UpdateRoomInput>(`${this.basePath}/${id}`, data);
  }

  async delete(id: string) {
    return httpClient.delete<RoomResponse>(`${this.basePath}/${id}`);
  }
}

export const roomApi = new RoomApi();
