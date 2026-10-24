export type TimetableStatus =
  | "draft"
  | "editing"
  | "completed"
  | "published"
  | "archived";

export interface Timetable {
  _id: string;
  title: string;
  description: string;
  status: TimetableStatus;
  createdAt: string;
  updatedAt: string;
}

export type CreateTimetable = Pick<Timetable, "title" | "description">;

export type SortOrder = 1 | -1 | 0;

export interface FilterTimetable {
  title?: SortOrder;
  status?: TimetableStatus;
  createdAt?: SortOrder;
}

export interface TimetableQueryParams {
  query?: string;
  status?: TimetableStatus;
  sortBy?: "title" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
  limit?: number;
}
