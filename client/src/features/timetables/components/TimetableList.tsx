"use client";

import { memo } from "react";

import { useGetTimetables } from "../hooks/timetable.query";
import { Timetable } from "../types/timetable.types";
import TimetableCard from "./TimetableCard";
import TimetableEmptyState from "./TimetableEmptyState";

const TimetableList = memo(function TimetableList() {
  //todo add filters
  const { data } = useGetTimetables();

  if (data.data.length === 0) {
    return <TimetableEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {data.data.map((timetable: Timetable) => (
        <TimetableCard key={timetable._id} timetable={timetable} />
      ))}
    </div>
  );
});

export default TimetableList;
