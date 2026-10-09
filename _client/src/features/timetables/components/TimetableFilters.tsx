import { Check, ListFilter, RotateCcw } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

import { Button } from '@/shared/ui/button';
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
      {/* Filters */}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              className={`h-9 gap-2 border-border/60 px-3 text-xs shadow-none ${
                hasFilters ? 'border-primary/30 bg-primary/5 text-primary' : 'text-muted-foreground'
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

        <DropdownMenuContent align="start" className="w-56">
          {/* Department */}
          <DropdownMenuGroup>
            <DropdownMenuLabel>Department</DropdownMenuLabel>

            <DropdownMenuItem onClick={() => onFilterChange('department', 'all')}>
              <span>All Departments</span>
              {filters.department === 'all' && <Check className="ml-auto size-4" />}
            </DropdownMenuItem>

            {['CSE', 'ECE', 'EEE', 'CIVIL', 'MECH'].map((department) => (
              <DropdownMenuItem
                key={department}
                onClick={() => onFilterChange('department', department)}
              >
                <span>{department}</span>

                {filters.department === department && <Check className="ml-auto size-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Academic Year */}
          <DropdownMenuGroup>
            <DropdownMenuLabel>Academic Year</DropdownMenuLabel>

            {[
              { value: 'all', label: 'All Years' },
              { value: '2026-27', label: '2026-27' },
              { value: '2025-26', label: '2025-26' },
              { value: '2024-25', label: '2024-25' },
            ].map((year) => (
              <DropdownMenuItem
                key={year.value}
                onClick={() => onFilterChange('academicYear', year.value)}
              >
                <span>{year.label}</span>

                {filters.academicYear === year.value && <Check className="ml-auto size-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* Stage */}
          <DropdownMenuGroup>
            <DropdownMenuLabel>Stage</DropdownMenuLabel>

            {[
              { value: 'all', label: 'All Stages' },
              { value: 'incomplete', label: 'Incomplete' },
              { value: 'complete', label: 'Complete' },
            ].map((stage) => (
              <DropdownMenuItem
                key={stage.value}
                onClick={() => onFilterChange('stage', stage.value)}
              >
                <span>{stage.label}</span>

                {filters.stage === stage.value && <Check className="ml-auto size-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

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

      {/* Clear */}
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
