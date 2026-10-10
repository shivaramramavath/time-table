"use client";

import { CalendarDays, ChevronDown, Clock3, MapPin, Users } from "lucide-react";
import { useMemo, useState } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const TIMES = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

const mockScheduleBlocks = [
  {
    id: "b1",
    subject: "DBMS",
    faculty: "Prof. Ravi Kumar",
    room: "Room 101",
    section: "CSE-A",
    day: "Monday",
    period: 0,
    color: "#818cf8",
  },
  {
    id: "b2",
    subject: "OS",
    faculty: "Prof. Ravi Kumar",
    room: "Room 101",
    section: "CSE-A",
    day: "Monday",
    period: 2,
    color: "#c084fc",
  },
  {
    id: "b3",
    subject: "ML",
    faculty: "Prof. Venkat Rao",
    room: "Room 102",
    section: "CSE-A",
    day: "Monday",
    period: 4,
    color: "#22d3ee",
  },
  {
    id: "b4",
    subject: "DBMS",
    faculty: "Prof. Ravi Kumar",
    room: "Room 101",
    section: "CSE-A",
    day: "Tuesday",
    period: 1,
    color: "#818cf8",
  },
  {
    id: "b5",
    subject: "CN",
    faculty: "Prof. Ravi Kumar",
    room: "Room 102",
    section: "CSE-A",
    day: "Tuesday",
    period: 3,
    color: "#f472b6",
  },
  {
    id: "b6",
    subject: "DBMS Lab",
    faculty: "Prof. Venkat Rao",
    room: "CS Lab 1",
    section: "CSE-A",
    day: "Wednesday",
    period: 0,
    color: "#fb923c",
  },
  {
    id: "b7",
    subject: "ML",
    faculty: "Prof. Venkat Rao",
    room: "Room 102",
    section: "CSE-A",
    day: "Wednesday",
    period: 3,
    color: "#22d3ee",
  },
  {
    id: "b8",
    subject: "OS",
    faculty: "Prof. Ravi Kumar",
    room: "Room 101",
    section: "CSE-A",
    day: "Thursday",
    period: 0,
    color: "#c084fc",
  },
  {
    id: "b9",
    subject: "SE",
    faculty: "Dr. Shiva Ram Ramavath",
    room: "Room 102",
    section: "CSE-A",
    day: "Thursday",
    period: 2,
    color: "#4ade80",
  },
  {
    id: "b10",
    subject: "CN",
    faculty: "Prof. Ravi Kumar",
    room: "Room 101",
    section: "CSE-A",
    day: "Friday",
    period: 1,
    color: "#f472b6",
  },
  {
    id: "b11",
    subject: "SE",
    faculty: "Dr. Shiva Ram Ramavath",
    room: "Room 102",
    section: "CSE-A",
    day: "Friday",
    period: 3,
    color: "#4ade80",
  },
  {
    id: "b12",
    subject: "ML",
    faculty: "Prof. Venkat Rao",
    room: "Room 102",
    section: "CSE-A",
    day: "Friday",
    period: 5,
    color: "#22d3ee",
  },
];

type ScheduleBlockData = (typeof mockScheduleBlocks)[number];

function ScheduleBlock({
  block,
  onSelect,
}: {
  block: ScheduleBlockData;
  onSelect: (block: ScheduleBlockData) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(block)}
      title={`${block.subject} · ${block.faculty} · ${block.room}`}
      className="group absolute inset-1 z-10 flex flex-col overflow-hidden rounded-lg border p-2 text-left transition-all duration-200 hover:z-20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      style={{
        backgroundColor: `${block.color}14`,
        borderColor: `${block.color}50`,
        borderLeftWidth: "3px",
        borderLeftColor: block.color,
      }}
    >
      <span className="truncate text-[11px] font-semibold tracking-tight text-white">
        {block.subject}
      </span>

      <span className="mt-1 truncate text-[10px] text-neutral-400">
        {block.faculty.split(" ").slice(-1)[0]}
      </span>

      <span className="mt-auto flex items-center gap-1 truncate pt-1 text-[9px] text-neutral-500">
        <MapPin size={10} className="shrink-0" />
        {block.room}
      </span>
    </button>
  );
}

export default function HeroPreview() {
  const [selectedBlock, setSelectedBlock] = useState<ScheduleBlockData | null>(
    null,
  );
  const [selectedDay, setSelectedDay] = useState("All days");

  const blocksByCell = useMemo(() => {
    const map = new Map<string, ScheduleBlockData>();
    mockScheduleBlocks.forEach((block) => {
      map.set(`${block.day}-${block.period}`, block);
    });
    return map;
  }, []);

  const visibleDays =
    selectedDay === "All days"
      ? DAYS
      : DAYS.filter((day) => day === selectedDay);

  return (
    <section className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0c0d10] text-white shadow-2xl shadow-black/30">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] px-4 py-4 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-300">
            <CalendarDays size={19} />
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-tight">
              Weekly timetable
            </h3>
            <p className="mt-1 text-[11px] text-neutral-500">
              Academic year 2026–27
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            setSelectedDay(selectedDay === "All days" ? "Monday" : "All days")
          }
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-neutral-300 transition hover:bg-white/[0.07]"
        >
          {selectedDay === "All days" ? "All days" : selectedDay}
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 border-b border-white/[0.07] p-2 sm:px-5">
        <SummaryItem
          icon={CalendarDays}
          label="Classes"
          value={`${mockScheduleBlocks.length}`}
        />
        <SummaryItem icon={Users} label="Section" value="CSE-A" />
        <SummaryItem icon={Clock3} label="Hours / day" value="08" />
      </div>

      {/* Subject legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 border-b border-white/[0.07] px-4 py-3 sm:px-5">
        {[
          ["DBMS", "#818cf8"],
          ["OS", "#c084fc"],
          ["ML", "#22d3ee"],
          ["CN", "#f472b6"],
          ["SE", "#4ade80"],
          ["Lab", "#fb923c"],
        ].map(([label, color]) => (
          <div key={label} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-[10px] text-neutral-400">{label}</span>
          </div>
        ))}
      </div>

      {/* Timetable grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[650px] p-3 sm:p-4">
          <div
            className="grid"
            style={{
              gridTemplateColumns: `68px repeat(${visibleDays.length}, minmax(100px, 1fr))`,
            }}
          >
            <div className="flex items-center justify-center pb-3 text-[10px] text-neutral-600">
              <Clock3 size={14} />
            </div>

            {visibleDays.map((day) => (
              <div key={day} className="px-1 pb-3 text-center">
                <div className="rounded-lg bg-white/[0.035] py-2 text-[11px] font-medium text-neutral-300">
                  {day.slice(0, 3)}
                </div>
              </div>
            ))}

            {TIMES.map((time, periodIdx) => (
              <div key={time} className="contents">
                <div className="flex items-start justify-center border-t border-white/[0.06] pr-2 pt-3 text-[10px] tabular-nums text-neutral-500">
                  {time}
                </div>

                {visibleDays.map((day) => {
                  const block = blocksByCell.get(`${day}-${periodIdx}`);

                  return (
                    <div
                      key={`${day}-${time}`}
                      className="relative h-[76px] border-l border-t border-white/[0.06] transition-colors hover:bg-white/[0.015]"
                    >
                      {block && (
                        <ScheduleBlock
                          block={block}
                          onSelect={setSelectedBlock}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-2">
      <div className="flex items-center gap-1.5 text-neutral-500">
        <Icon size={13} />
        <span className="text-[10px]">{label}</span>
      </div>
      <p className="text-lg font-semibold tracking-tight text-neutral-100">
        {value}
      </p>
    </div>
  );
}
