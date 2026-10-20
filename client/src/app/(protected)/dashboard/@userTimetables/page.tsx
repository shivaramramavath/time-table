import UserTimetables from "@/features/timetables/components/UserTimetables";
import type { Timetable } from "@/features/timetables/types/timetable.types";

const timetables: Timetable[] = [
  {
    _id: "timetable-1",
    title: "Computer Science — Semester 5",
    description: "Weekly schedule for lectures and laboratory sessions.",
    status: "published",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "timetable-2",
    title: "Data Structures and Algorithms",
    description: "Draft timetable for upcoming classes.",
    status: "draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "timetable-3",
    title: "Data Structures and Algorithms",
    description: "Draft timetable for upcoming classes.",
    status: "published",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "timetable-4",
    title: "Data Structures and Algorithms",
    description: "Draft timetable for upcoming classes.",
    status: "draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "timetable-5",
    title: "Data Structures and Algorithms",
    description: "Draft timetable for upcoming classes.",
    status: "draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function UserTimetablesPage() {
  return (
    <main className="">
      <UserTimetables timetables={timetables} />
    </main>
  );
}
