import { httpClient } from "@/shared/lib/http/http-client";
import { Axios } from "axios";
import { CreateTimetable } from "../types/timetable.types";

class TimetableApi {
  private path = "/timetable";

  constructor(private readonly httpClient: Axios) {}

  async create(data: CreateTimetable) {
    const { data: response } = await this.httpClient.post(`${this.path}`, data);

    return response;
  }

  async getAllTimetables(data: CreateTimetable) {
    const { data: response } = await this.httpClient.post(`${this.path}`, data);

    return response;
  }


}

export const timetableApi = new TimetableApi(httpClient);
