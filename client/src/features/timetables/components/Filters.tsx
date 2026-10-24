"use client";

import { Check, ListFilter, RotateCcw } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import { useTimetablesStore } from "../store/timetable.store";
import type { TimetableStatus } from "../types/timetable.types";

const statuses: { value: TimetableStatus | "all"; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "draft", label: "Draft" },
  { value: "editing", label: "Editing" },
  { value: "completed", label: "Completed" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

const Filters = () => {
  const status = useTimetablesStore((state) => state.status);
  const sortBy = useTimetablesStore((state) => state.sortBy);
  const sortOrder = useTimetablesStore((state) => state.sortOrder);

  const setStatus = useTimetablesStore((state) => state.setStatus);
  const setSortBy = useTimetablesStore((state) => state.setSortBy);
  const setSortOrder = useTimetablesStore((state) => state.setSortOrder);
  const resetFilters = useTimetablesStore((state) => state.resetFilters);

  const hasFilters = status !== undefined;
  const activeFilterCount = hasFilters ? 1 : 0;

  const sortValue =
    sortBy === "title"
      ? sortOrder === "asc"
        ? "az"
        : "za"
      : sortOrder === "asc"
        ? "oldest"
        : "recent";

  const handleSortChange = (value: string) => {
    switch (value) {
      case "recent":
        setSortBy("createdAt");
        setSortOrder("desc");
        break;
      case "oldest":
        setSortBy("createdAt");
        setSortOrder("asc");
        break;
      case "az":
        setSortBy("title");
        setSortOrder("asc");
        break;
      case "za":
        setSortBy("title");
        setSortOrder("desc");
        break;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              className={`h-9 gap-2 border-border/60 px-3 text-xs shadow-none ${
                hasFilters
                  ? "border-primary/30 bg-primary/5 text-primary"
                  : "text-muted-foreground"
              }`}
            />
          }
        >
          <ListFilter className="size-3.5" />
          <span className="hidden sm:inline">Filters</span>

          {activeFilterCount > 0 && (
            <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-semibold text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-52">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Status</DropdownMenuLabel>

            {statuses.map((item) => (
              <DropdownMenuItem
                key={item.value}
                onClick={() =>
                  setStatus(item.value === "all" ? undefined : item.value)
                }
              >
                <span>{item.label}</span>

                {(status ?? "all") === item.value && (
                  <Check className="ml-auto size-4" />
                )}
              </DropdownMenuItem>
            ))}

            
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mx-1 h-5 w-px bg-border/60" />

      <Select value={sortValue} onValueChange={handleSortChange}>
        <SelectTrigger className="h-9 w-auto min-w-[145px] border-border/60 bg-background text-xs shadow-none">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="recent">Recently Created</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="az">Name A–Z</SelectItem>
          <SelectItem value="za">Name Z–A</SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <button
          type="button"
          onClick={resetFilters}
          className="group flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <RotateCcw className="size-3 transition-transform group-hover:-rotate-45" />
          <span className="hidden md:inline">Clear</span>
        </button>
      )}
    </div>
  );
};

export default Filters;
