import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

import { useDesignerStore } from '../../../store/designer.store';
import { facultyService } from '../../../services/faculty.service';

import { subjectService } from '@/features/timetable-designer/services/subject.service';
import SelectResourceIds from '../common/SelectResourceIds';

interface Props {
  facultyId: string;
  onSave: () => void;
  onCancel: () => void;
}

type FacultyFormData = {
  name: string;
  email: string;
  department: string;
  unavailablePeriods: number;
};

const EditFacultyForm = ({ facultyId, onSave, onCancel }: Props) => {
  const faculty = useDesignerStore((state) => state.getFaculty(facultyId));

  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FacultyFormData>({
    defaultValues: {
      name: faculty?.name,
      email: faculty?.email,
      department: faculty?.department,
      unavailablePeriods: faculty?.unavailablePeriods,
    },
  });

  const onSubmit = async (data: FacultyFormData) => {
    await facultyService.update(facultyId, {
      ...faculty,

      name: data.name.trim(),

      email: data.email.trim(),

      department: data.department.trim() || undefined,

      subjectIds: selectedSubjectIds,

      unavailablePeriods: data.unavailablePeriods,
    });

    onSave();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-3">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-sm font-semibold">Edit Faculty</h3>

          <p className="text-[11px] text-muted-foreground">Update faculty information.</p>
        </div>

        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="edit-faculty-name">Name</Label>

          <Input
            id="edit-faculty-name"
            placeholder="e.g. Dr. Rajesh Kumar"
            {...register('name', {
              required: 'Name is required',
            })}
          />

          {errors.name && <p className="text-[10px] text-destructive">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="edit-faculty-email">Email</Label>

          <Input
            id="edit-faculty-email"
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
          <Label htmlFor="edit-faculty-department">Department</Label>

          <Input
            id="edit-faculty-department"
            placeholder="e.g. Computer Science & Engineering"
            {...register('department')}
          />
        </div>

        {/* Subjects */}
        <div className="space-y-1.5">
          <Label>Subjects</Label>

          <SelectResourceIds
            getAll={subjectService.getAll}
            initialSelectedIds={faculty?.subjectIds}
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
            Save Changes
          </Button>
        </div>
      </div>
    </form>
  );
};

export default memo(EditFacultyForm);
