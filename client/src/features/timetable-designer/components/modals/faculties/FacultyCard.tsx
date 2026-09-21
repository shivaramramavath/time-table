import { memo } from 'react';
import {
  BookOpen,
  Building2,
  CalendarDays,
  ChevronRight,
  Mail,
  MoreHorizontal,
  UserRound,
} from 'lucide-react';

import { Button } from '@/shared/ui/button';

import type { Faculty } from '../../../types';

interface Props {
  faculty: Faculty;
  onEdit: (facultyId: string) => void;
}

const FacultyCard = ({ faculty, onEdit }: Props) => {
  const handleEdit = () => {
    onEdit(faculty.id);
  };

  const workingDays = faculty.availability?.workingDays ?? [];

  const unavailableSlots = faculty.availability?.unavailableSlots ?? [];

  return (
    <div
      onClick={handleEdit}
      className="group relative flex cursor-pointer items-center gap-3 rounded-md border px-2.5 py-2 transition-colors hover:border-border hover:bg-muted/40"
    >
      {/* Icon */}
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
        <UserRound size={15} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {/* Name */}
        <div className="flex items-center gap-2">
          <p className="truncate text-xs font-medium">{faculty.name}</p>

          {faculty.department && (
            <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
              {faculty.department}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
          <Mail size={10} />

          <span className="truncate">{faculty.email}</span>
        </div>

        {/* Details */}
        <div className="mt-1.5 flex items-center gap-3 text-[9px] text-muted-foreground">
          {/* Subjects */}
          <span className="flex items-center gap-1">
            <BookOpen size={10} />
            {faculty.subjectIds.length} subjects
          </span>

          {/* Working Days */}
          {faculty.availability && (
            <>
              <span className="text-border">•</span>

              <span className="flex items-center gap-1">
                <CalendarDays size={10} />
                {workingDays.length} days
              </span>
            </>
          )}

          {/* Unavailable slots */}
          {unavailableSlots.length > 0 && (
            <>
              <span className="text-border">•</span>

              <span>{unavailableSlots.length} unavailable</span>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          className="size-7 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <MoreHorizontal size={14} />
        </Button>

        <ChevronRight
          size={14}
          className="text-muted-foreground/50 transition-transform group-hover:translate-x-0.5"
        />
      </div>
    </div>
  );
};

export default memo(FacultyCard);
