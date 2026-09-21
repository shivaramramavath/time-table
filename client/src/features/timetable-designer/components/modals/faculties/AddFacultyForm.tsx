import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

import type { Faculty } from '../../../types';
import { facultyService } from '../../../services/faculty.service';
import SelectResourceIds from '../common/SelectResourceIds';
import { subjectService } from '@/features/timetable-designer/services/subject.service';
import { generateFacultyId } from '@/features/timetable-designer/utils/generate-ids';

interface Props {
  onSave: () => void;
  onCancel: () => void;
}

type FacultyFormData = {
  name: string;
  email: string;
  department: string;
  unavailablePeriods: number;
};

const AddFacultyForm = ({ onSave, onCancel }: Props) => {
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FacultyFormData>({
    defaultValues: {
      name: '',
      email: '',
      department: 'Computer Science & Engineering',
      unavailablePeriods: 0,
    },
  });

  const onSubmit = async (data: FacultyFormData) => {
    const faculty: Faculty = {
      id: generateFacultyId(),

      name: data.name.trim(),

      email: data.email.trim(),

      department: data.department.trim() || undefined,

      subjectIds: selectedSubjectIds,

      unavailablePeriods: data.unavailablePeriods,
    };

    await facultyService.add(faculty);

    onSave();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-3">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-sm font-semibold">Add Faculty</h3>

          <p className="text-[11px] text-muted-foreground">
            Create a faculty member and assign subjects.
          </p>
        </div>

        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="faculty-name">Name</Label>

          <Input
            id="faculty-name"
            placeholder="e.g. Dr. Rajesh Kumar"
            {...register('name', {
              required: 'Name is required',
            })}
          />

          {errors.name && <p className="text-[10px] text-destructive">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="faculty-email">Email</Label>

          <Input
            id="faculty-email"
            type="email"
            placeholder="e.g. rajesh@pvpsit.ac.in"
            {...register('email', {
              required: 'Email is required',
            })}
          />

          {errors.email && <p className="text-[10px] text-destructive">{errors.email.message}</p>}
        </div>

        {/* Department */}
        <div className="space-y-1.5">
          <Label htmlFor="faculty-department">Department</Label>

          <Input
            id="faculty-department"
            placeholder="e.g. Computer Science & Engineering"
            {...register('department')}
          />
        </div>

        {/* Subjects */}
        <div className="space-y-1.5">
          <Label>Subjects</Label>

          <SelectResourceIds
            getAll={subjectService.getAll}
            initialSelectedIds={selectedSubjectIds}
            setSelectedIds={setSelectedSubjectIds}
            placeholder="Search subjects..."
            renderMeta={(subject) => (
              <>
                {subject.code}
                {' • '}
                {subject.labDetails?.isLab ? 'Laboratory' : 'Theory'}
              </>
            )}
          />
        </div>

        {/* Unavailable Periods */}
        <div className="space-y-1.5">
          <Label htmlFor="unavailable-periods">Unavailable Periods</Label>

          <Input
            id="unavailable-periods"
            type="number"
            min={0}
            placeholder="e.g. 2"
            {...register('unavailablePeriods', {
              valueAsNumber: true,
              min: {
                value: 0,
                message: 'Unavailable periods cannot be negative',
              },
            })}
          />

          {errors.unavailablePeriods && (
            <p className="text-[10px] text-destructive">{errors.unavailablePeriods.message}</p>
          )}

          <p className="text-[10px] text-muted-foreground">
            Number of periods when this faculty member cannot be scheduled.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>

          <Button type="submit" size="sm">
            Add Faculty
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddFacultyForm;
