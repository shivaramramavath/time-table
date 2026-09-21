import { memo } from 'react';
import {
  BookOpen,
  Clock3,
  GraduationCap,
  FlaskConical,
  Users,
  MoreHorizontal,
  ChevronRight,
  Building2,
} from 'lucide-react';

import { Button } from '@/shared/ui/button';

import type { Subject } from '../../../types';
import { subjectService } from '../../../services/subject.service';

interface Props {
  subject: Subject;
  onEdit: (subjectId: string) => void;
}

const SubjectCard = ({ subject, onEdit }: Props) => {
  const handleDelete = async (subjectId: string) => {
    await subjectService.remove(subjectId);
  };

  const isLab = subject.labDetails.isLab;

  const roomType = subject.roomRequirements?.type;

  return (
    <div
      onClick={() => onEdit(subject.id)}
      className="group flex cursor-pointer items-center gap-3 rounded-lg border bg-background px-3 py-2.5 transition-all hover:border-muted-foreground/30 hover:bg-muted/30 hover:shadow-sm"
    >
      <div
        className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
          isLab ? 'bg-violet-500/10 text-violet-500' : 'bg-blue-500/10 text-blue-500'
        }`}
      >
        {isLab ? <FlaskConical className="size-4" /> : <BookOpen className="size-4" />}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-xs font-semibold">{subject.name}</p>

          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-medium ${
              isLab ? 'bg-violet-500/10 text-violet-500' : 'bg-blue-500/10 text-blue-500'
            }`}
          >
            {isLab ? 'LAB' : 'THEORY'}
          </span>
        </div>

        <div className="mt-1.5 flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="font-medium text-foreground/70">{subject.code || 'No code'}</span>

          <span className="flex items-center gap-1">
            <Clock3 className="size-3" />
            {subject.duration} min
          </span>

          <span className="flex items-center gap-1">
            <GraduationCap className="size-3" />
            {subject.weeklyPeriods}/week
          </span>
        </div>

        <div className="mt-1.5 flex items-center gap-3 text-[9px] text-muted-foreground">
          {subject.periodsPerDay !== undefined && <span>{subject.periodsPerDay}/day</span>}

          {subject.consecutivePeriods !== undefined && (
            <span>{subject.consecutivePeriods} consecutive</span>
          )}

          {roomType && (
            <span className="flex items-center gap-1">
              <Building2 className="size-3" />
              {roomType === 'seminar-hall'
                ? 'Seminar Hall'
                : roomType === 'laboratory'
                  ? 'Laboratory'
                  : 'Classroom'}
            </span>
          )}

          {subject.roomRequirements?.minimumCapacity !== undefined && (
            <span className="flex items-center gap-1">
              <Users className="size-3" />
              {subject.roomRequirements.minimumCapacity}+
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center">
        <Button
          variant="ghost"
          size="icon"
          className="size-7 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={(event) => {
            event.stopPropagation();
            handleDelete(subject.id);
          }}
        >
          <MoreHorizontal className="size-3.5" />
        </Button>

        <ChevronRight className="size-4 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
      </div>
    </div>
  );
};

export default memo(SubjectCard);
