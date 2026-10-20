"use client";

import { useMemo, useState } from "react";

import type { Timetable } from "../types/timetable.types";
import Create from "./Create";
import SearchBar from "./SearchBar";
import TimetableCard from "./TimetableCard";

type Props = {
  timetables: Timetable[];
};

const UserTimetables = ({ timetables }: Props) => {
  const [query, setQuery] = useState("");

  const filteredTimetables = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return timetables;

    return timetables.filter((timetable) =>
      [timetable.title, timetable.description, timetable.status].some((value) =>
        value?.toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [timetables, query]);

  if (timetables.length === 0) {
    return (
      <section className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 text-center">
        <h2 className="text-base font-medium text-white">No timetables yet</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Create your first timetable to get started.
        </p>

        <div className="mt-4">
          <Create />
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Your timetables" className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar query={query} setQuery={setQuery} />

        <Create />
      </div>

      {filteredTimetables.length === 0 ? (
        <div className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 text-center">
          <h2 className="text-base font-medium">No matching timetables</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Try another title, description, or status.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredTimetables.map((timetable) => (
            <TimetableCard key={timetable._id} timetable={timetable} />
          ))}
        </div>
      )}
    </section>
  );
};

export default UserTimetables;
