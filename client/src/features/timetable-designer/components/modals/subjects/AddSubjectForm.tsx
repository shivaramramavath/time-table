import { useForm } from 'react-hook-form';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

import type { Subject } from '../../../types';
import { subjectService } from '../../../services/subject.service';
import { generateSubjectId } from '@/features/timetable-designer/utils/generate-ids';

interface Props {
  onSave: () => void;
  onCancel: () => void;
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

const AddSubjectForm = ({ onSave, onCancel }: Props) => {
  const { register, handleSubmit } = useForm<SubjectFormData>({
    defaultValues: {
      name: '',
      code: '',
      duration: 60,
      isLab: false,
      weeklyPeriods: 4,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomType: 'classroom',
      minimumCapacity: 60,
    },
  });

  const onSubmit = (data: SubjectFormData) => {
    const subject: Subject = {
      id: generateSubjectId(),

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
    };

    subjectService.add(subject);

    onSave();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="pb-2">
        <h3 className="font-semibold">Add Subject</h3>

        <p className="text-sm text-muted-foreground">Create a theory subject or laboratory.</p>
      </div>
      <div className="space-y-4 overflow-y-auto scrollbar h-full">
        <div className="space-y-1.5">
          <Label htmlFor="subject-name">Subject Name</Label>

          <Input
            id="subject-name"
            placeholder="e.g. Database Management Systems"
            {...register('name', {
              required: 'Subject name is required',
            })}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="subject-code">Subject Code</Label>

          <Input
            id="subject-code"
            placeholder="e.g. CS301"
            {...register('code', {
              required: 'Subject code is required',
            })}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="subject-duration">Duration (minutes)</Label>

            <Input
              id="subject-duration"
              type="number"
              min={1}
              {...register('duration', {
                valueAsNumber: true,
              })}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="minimum-capacity">Minimum Capacity</Label>

            <Input
              id="minimum-capacity"
              type="number"
              min={1}
              {...register('minimumCapacity', {
                valueAsNumber: true,
              })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="weekly-periods">Weekly Periods</Label>

            <Input
              id="weekly-periods"
              type="number"
              min={1}
              {...register('weeklyPeriods', {
                valueAsNumber: true,
              })}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="periods-per-day">Periods / Day</Label>

            <Input
              id="periods-per-day"
              type="number"
              min={1}
              {...register('periodsPerDay', {
                valueAsNumber: true,
              })}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="consecutive-periods">Consecutive Periods</Label>

          <Input
            id="consecutive-periods"
            type="number"
            min={1}
            {...register('consecutivePeriods', {
              valueAsNumber: true,
            })}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="room-type">Required Room Type</Label>

          <select
            id="room-type"
            {...register('roomType')}
            className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          >
            <option value="classroom">Classroom</option>
            <option value="laboratory">Laboratory</option>
            <option value="seminar-hall">Seminar Hall</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="subject-is-lab"
            type="checkbox"
            {...register('isLab')}
            className="size-4 rounded border"
          />

          <Label htmlFor="subject-is-lab" className="cursor-pointer text-sm">
            Laboratory Subject
          </Label>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>

          <Button type="submit" size="sm">
            Add Subject
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddSubjectForm;
