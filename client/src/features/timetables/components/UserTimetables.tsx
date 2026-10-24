"use client";

import Create from "./Create";
import Filters from "./Filters";
import SearchBar from "./SearchBar";
import TimetableList from "./TimetableList";

export default function UserTimetables() {
  return (
    <section aria-label="Your timetables" className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row">
          <SearchBar />
          <Filters />
        </div>

        <Create />
      </div>

      <TimetableList />
    </section>
  );
}
