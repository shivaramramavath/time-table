import { memo } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

import { subjectService } from '../../../services/subject.service';

interface Props {
  subjectId: string;
  onCancel: () => void;
  onSave: () => void;
}

type SubjectFormData = {
  name: string;
  code: string;
  duration: number;
  isLab: boolean;
  weeklyPeriods: number;
  periodsPerDay: number;
  consecutivePeriods: number;
  roomType: 'classroom' | 'laboratory' | 'seminar-hall';
  minimumCapacity: number;
};

const EditSubjectForm = ({ subjectId, onCancel, onSave }: Props) => {
  const subject = subjectService.getById(subjectId);

  const { register, handleSubmit } = useForm<SubjectFormData>({
    defaultValues: subject
      ? {
          name: subject.name,
          code: subject.code,
          duration: subject.duration,

          isLab: subject.labDetails.isLab,

          weeklyPeriods: subject.weeklyPeriods,

          periodsPerDay: subject.periodsPerDay ?? 1,

          consecutivePeriods: subject.consecutivePeriods ?? 1,

          roomType:
            subject.roomRequirements?.type ??
            (subject.labDetails.isLab ? 'laboratory' : 'classroom'),

          minimumCapacity: subject.roomRequirements?.minimumCapacity ?? 60,
        }
      : undefined,
  });

  if (!subject) {
    return null;
  }

  const onSubmit = (data: SubjectFormData) => {
    subjectService.update(subjectId, {
      ...subject,

      name: data.name.trim() || 'New Subject',

      code: data.code.trim(),

      duration: data.duration,

      labDetails: {
        isLab: data.isLab,

        ...(data.isLab && {
          weeklyPeriods: data.weeklyPeriods,
        }),
      },

      weeklyPeriods: data.weeklyPeriods,

      periodsPerDay: data.periodsPerDay,

      consecutivePeriods: data.consecutivePeriods,

      roomRequirements: {
        type: data.roomType,
        minimumCapacity: data.minimumCapacity,
      },
    });

    onSave();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-3">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold">Edit Subject</h3>

          <p className="text-[11px] text-muted-foreground">Update subject configuration.</p>
        </div>

        {/* Subject Name */}
        <div className="space-y-1.5">
          <Label htmlFor="edit-subject-name">Subject Name</Label>

          <Input
            id="edit-subject-name"
            placeholder="e.g. Database Management Systems"
            {...register('name', {
              required: true,
            })}
          />
        </div>

        {/* Subject Code */}
        <div className="space-y-1.5">
          <Label htmlFor="edit-subject-code">Subject Code</Label>

          <Input
            id="edit-subject-code"
            placeholder="e.g. CS301"
            {...register('code', {
              required: true,
            })}
          />
        </div>

        {/* Duration + Capacity */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="edit-duration">Duration (minutes)</Label>

            <Input
              id="edit-duration"
              type="number"
              min={1}
              {...register('duration', {
                valueAsNumber: true,
              })}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-minimum-capacity">Minimum Capacity</Label>

            <Input
              id="edit-minimum-capacity"
              type="number"
              min={1}
              {...register('minimumCapacity', {
                valueAsNumber: true,
              })}
            />
          </div>
        </div>

        {/* Weekly + Daily */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="edit-weekly-periods">Weekly Periods</Label>

            <Input
              id="edit-weekly-periods"
              type="number"
              min={1}
              {...register('weeklyPeriods', {
                valueAsNumber: true,
              })}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-periods-per-day">Periods / Day</Label>

            <Input
              id="edit-periods-per-day"
              type="number"
              min={1}
              {...register('periodsPerDay', {
                valueAsNumber: true,
              })}
            />
          </div>
        </div>

        {/* Consecutive */}
        <div className="space-y-1.5">
          <Label htmlFor="edit-consecutive-periods">Consecutive Periods</Label>

          <Input
            id="edit-consecutive-periods"
            type="number"
            min={1}
            {...register('consecutivePeriods', {
              valueAsNumber: true,
            })}
          />
        </div>

        {/* Room Type */}
        <div className="space-y-1.5">
          <Label htmlFor="edit-room-type">Required Room Type</Label>

          <select
            id="edit-room-type"
            {...register('roomType')}
            className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          >
            <option value="classroom">Classroom</option>

            <option value="laboratory">Laboratory</option>

            <option value="seminar-hall">Seminar Hall</option>
          </select>
        </div>

        {/* Lab */}
        <div className="flex items-center gap-2">
          <input
            id="edit-is-lab"
            type="checkbox"
            {...register('isLab')}
            className="size-4 rounded border"
          />

          <Label htmlFor="edit-is-lab" className="cursor-pointer text-sm">
            Laboratory Subject
          </Label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>

          <Button type="submit" size="sm">
            Save Changes
          </Button>
        </div>
      </div>
    </form>
  );
};

export default memo(EditSubjectForm);
