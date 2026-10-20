import {
  Archive,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  FileText,
  Pencil,
} from "lucide-react";
import Link from "next/link";

import { cn } from "@/shared/lib/utils";
import type { Timetable } from "../types/timetable.types";

type Props = {
  timetable: Timetable;
};

const statusConfig = {
  draft: {
    label: "Draft",
    className: "text-yellow-400",
    icon: FileText,
  },
  editing: {
    label: "Editing",
    className: "text-blue-400",
    icon: Pencil,
  },
  completed: {
    label: "Completed",
    className: "text-emerald-400",
    icon: CheckCircle2,
  },
  published: {
    label: "Published",
    className: "text-emerald-400",
    icon: CheckCircle2,
  },
  archived: {
    label: "Archived",
    className: "text-muted-foreground",
    icon: Archive,
  },
} as const;

const TimetableCard = ({ timetable }: Props) => {
  const status = statusConfig[timetable.status];
  const StatusIcon = status.icon;

  return (
    <Link
      href={`/timetables/${timetable._id}`}
      className={cn(
        "group relative flex min-h-[264px] flex-col rounded-[20px]",
        "border border-white/[0.09] bg-[#111111] p-6",
        "transition-all duration-200",
        "hover:border-white/20 hover:bg-[#141414]",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-white/40",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex size-9 items-center justify-center rounded-lg text-white/75">
          <FileText className="size-8" strokeWidth={1.8} aria-hidden="true" />
        </div>

        <div
          className={cn(
            "flex items-center gap-2 text-xs font-medium",
            status.className,
          )}
        >
          <span>{status.label}</span>

          <StatusIcon className="size-3.5" aria-hidden="true" />

          <ArrowUpRight
            className="ml-1 size-4 opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-7">
        <h3 className="line-clamp-1 text-lg font-medium tracking-tight text-white">
          {timetable.title}
        </h3>

        <p className="mt-1 text-xs tracking-wide text-white/40">Timetable</p>

        <p className="mt-5 line-clamp-2 text-sm leading-6 text-white/55">
          {timetable.description || "No description provided."}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between gap-3 pt-6 text-xs text-white/45">
        <div className="flex items-center gap-1.5">
          <Clock3 className="size-3.5" aria-hidden="true" />

          <span>
            Updated{" "}
            {new Date(timetable.updatedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>

        <span className="shrink-0 font-mono">
          {timetable.status.toUpperCase()}
        </span>
      </div>
    </Link>
  );
};

export default TimetableCard;
