import type { AxiosInstance } from "axios";

import { httpClient } from "@/shared/lib/http/http-client";
import type { CreateTimetable } from "../types/timetable.types";

class TimetableApi {
  private readonly path = "/timetable";

  constructor(private readonly httpClient: AxiosInstance) {}

  async create(data: CreateTimetable) {
    const { data: response } = await this.httpClient.post(this.path, data);

    return response;
  }

  async getAllTimetables() {
    const { data: response } = await this.httpClient.get(this.path);

    return response.data;
  }
}

export const timetableApi = new TimetableApi(httpClient);
