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

export interface CreateTimetable {
  title: string;
  description: string;
}
