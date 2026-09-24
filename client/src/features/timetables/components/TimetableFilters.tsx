import { ListFilter, RotateCcw } from 'lucide-react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

import type { TimetableFiltersState } from './Timetables';

interface TimetableFiltersProps {
  filters: TimetableFiltersState;
  onFilterChange: (key: keyof TimetableFiltersState, value: string) => void;
  onClear: () => void;
  hasFilters: boolean;
}

const TimetableFilters = ({
  filters,
  onFilterChange,
  onClear,
  hasFilters,
}: TimetableFiltersProps) => {
  const activeFilterCount = [
    filters.department !== 'all',
    filters.academicYear !== 'all',
    filters.stage !== 'all',
  ].filter(Boolean).length;

  return (
    <div className="flex items-center gap-2">
      {/* Filter indicator */}
      <div
        className={`flex h-9 items-center gap-2 rounded-lg border px-3 text-xs transition-colors ${
          hasFilters
            ? 'border-primary/30 bg-primary/5 text-primary'
            : 'border-border/60 bg-background text-muted-foreground'
        }`}
      >
        <ListFilter className="size-3.5" />

        <span className="hidden sm:inline">Filters</span>

        {activeFilterCount > 0 && (
          <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-semibold text-primary-foreground">
            {activeFilterCount}
          </span>
        )}
      </div>

      {/* Department */}
      <Select
        value={filters.department}
        onValueChange={(value) => onFilterChange('department', value)}
      >
        <SelectTrigger
          className={`h-9 w-auto min-w-[105px] gap-1.5 border-border/60 bg-background text-xs shadow-none ${
            filters.department !== 'all' ? 'border-primary/30 bg-primary/5' : ''
          }`}
        >
          <SelectValue placeholder="Department" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          <SelectItem value="CSE">CSE</SelectItem>
          <SelectItem value="ECE">ECE</SelectItem>
          <SelectItem value="EEE">EEE</SelectItem>
          <SelectItem value="CIVIL">CIVIL</SelectItem>
          <SelectItem value="MECH">MECH</SelectItem>
        </SelectContent>
      </Select>

      {/* Academic Year */}
      <Select
        value={filters.academicYear}
        onValueChange={(value) => onFilterChange('academicYear', value)}
      >
        <SelectTrigger
          className={`h-9 w-auto min-w-[105px] gap-1.5 border-border/60 bg-background text-xs shadow-none ${
            filters.academicYear !== 'all' ? 'border-primary/30 bg-primary/5' : ''
          }`}
        >
          <SelectValue placeholder="Academic Year" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Years</SelectItem>
          <SelectItem value="2026-27">2026-27</SelectItem>
          <SelectItem value="2025-26">2025-26</SelectItem>
          <SelectItem value="2024-25">2024-25</SelectItem>
        </SelectContent>
      </Select>

      {/* Stage */}
      <Select value={filters.stage} onValueChange={(value) => onFilterChange('stage', value)}>
        <SelectTrigger
          className={`h-9 w-auto min-w-[100px] gap-1.5 border-border/60 bg-background text-xs shadow-none ${
            filters.stage !== 'all' ? 'border-primary/30 bg-primary/5' : ''
          }`}
        >
          <SelectValue placeholder="Stage" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Stages</SelectItem>
          <SelectItem value="incomplete">Incomplete</SelectItem>
          <SelectItem value="complete">Complete</SelectItem>
        </SelectContent>
      </Select>

      {/* Divider */}
      <div className="mx-1 h-5 w-px bg-border/60" />

      {/* Sort */}
      <Select value={filters.sort} onValueChange={(value) => onFilterChange('sort', value)}>
        <SelectTrigger className="h-9 w-auto min-w-[125px] border-border/60 bg-background text-xs shadow-none">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="recent">Recently Created</SelectItem>

          <SelectItem value="oldest">Oldest First</SelectItem>

          <SelectItem value="az">Name A-Z</SelectItem>

          <SelectItem value="za">Name Z-A</SelectItem>
        </SelectContent>
      </Select>

      {/* Clear filters */}
      {hasFilters && (
        <button
          type="button"
          onClick={onClear}
          className="group flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <RotateCcw className="size-3 transition-transform group-hover:-rotate-45" />
          <span className="hidden md:inline">Clear</span>
        </button>
      )}
    </div>
  );
};

export default TimetableFilters;
