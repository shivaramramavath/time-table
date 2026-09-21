import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useReactFlow } from '@xyflow/react';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/shared/ui/dialog';

import { useModalStore } from '../../store/modal.store';
import { nodeService } from '../../services/node.service';

import { facultyService } from '../../services/faculty.service';
import { subjectService } from '../../services/subject.service';
import { roomService } from '../../services/room.service';

import SelectResourceIds from './common/SelectResourceIds';

import type { Program } from '../../types/node.types';

interface Props {
  data: {
    id?: string;
  } | null;
}

type BreakType = 'lunch' | 'short-break';

type ProgramFormData = {
  label: string;

  startTime: string;
  endTime: string;
  numberOfPeriods: number;

  workingDays: string[];

  breaks: {
    type: BreakType;
    startTime: string;
    endTime: string;
  }[];
};

const WORKING_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const DEFAULT_BREAKS: ProgramFormData['breaks'] = [
  {
    type: 'lunch',
    startTime: '13:00',
    endTime: '14:00',
  },
];

const ProgramModal = ({ data }: Props) => {
  const close = useModalStore((state) => state.close);

  const { getNode, setNodes } = useReactFlow();

  const program = (data?.id ? getNode(data.id)?.data : undefined) as Program['data'] | undefined;

  /*
   * Resource selections
   */
  const [selectedFacultyIds, setSelectedFacultyIds] = useState<string[]>(
    program?.resources?.facultyIds ?? [],
  );

  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>(
    program?.resources?.subjectIds ?? [],
  );

  const [selectedRoomIds, setSelectedRoomIds] = useState<string[]>(
    program?.resources?.roomIds ?? [],
  );

  /*
   * Form
   */
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProgramFormData>({
    defaultValues: {
      label: program?.label ?? '',

      startTime: program?.time?.startTime ?? '09:00',

      endTime: program?.time?.endTime ?? '17:00',

      numberOfPeriods: program?.time?.numberOfPeriods ?? 7,

      workingDays: program?.time?.workingDays?.length ? program.time.workingDays : WORKING_DAYS,

      breaks: program?.time?.breaks?.length ? program.time.breaks : DEFAULT_BREAKS,
    },
  });

  /*
   * Dynamic breaks
   */
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'breaks',
  });

  /*
   * Load program data
   */
  useEffect(() => {
    if (!program) return;

    reset({
      label: program.label ?? '',

      startTime: program.time?.startTime ?? '09:00',

      endTime: program.time?.endTime ?? '17:00',

      numberOfPeriods: program.time?.numberOfPeriods ?? 7,

      workingDays: program.time?.workingDays?.length ? program.time.workingDays : WORKING_DAYS,

      breaks: program.time?.breaks?.length ? program.time.breaks : DEFAULT_BREAKS,
    });

    setSelectedFacultyIds(program.resources?.facultyIds ?? []);

    setSelectedSubjectIds(program.resources?.subjectIds ?? []);

    setSelectedRoomIds(program.resources?.roomIds ?? []);
  }, [program, reset]);

  /*
   * Submit
   */
  const handleUpdate = (formData: ProgramFormData) => {
    if (!data?.id) return;

    const updatedData = {
      ...program,

      label: formData.label.trim(),

      time: {
        ...program?.time,

        startTime: formData.startTime,
        endTime: formData.endTime,
        numberOfPeriods: formData.numberOfPeriods,
        workingDays: formData.workingDays,
        breaks: formData.breaks,
      },

      resources: {
        ...program?.resources,

        facultyIds: selectedFacultyIds,
        subjectIds: selectedSubjectIds,
        roomIds: selectedRoomIds,
      },
    };

    // Backend
    nodeService.update(data.id, {
      data: updatedData,
    });

    // React Flow
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === data.id
          ? {
              ...node,
              data: updatedData,
            }
          : node,
      ),
    );

    close();
  };

  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      {/* Header */}
      <DialogHeader>
        <DialogTitle>{program?.label || 'Program'}</DialogTitle>

        <DialogDescription>Configure program timetable settings.</DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-4 overflow-y-auto max-h-[70vh] scrollbar">
        {/* ========================================================= */}
        {/* Program Name */}
        {/* ========================================================= */}

        <div className="space-y-1.5">
          <Label htmlFor="program-label">Program Name</Label>

          <Input
            id="program-label"
            placeholder="e.g. Computer Science & Engineering"
            {...register('label', {
              required: 'Program name is required',
            })}
          />

          {errors.label && <p className="text-[10px] text-destructive">{errors.label.message}</p>}
        </div>

        {/* ========================================================= */}
        {/* Working Time */}
        {/* ========================================================= */}

        <div className="space-y-2">
          <Label>Working Time</Label>

          <div className="grid grid-cols-2 gap-3">
            {/* Start */}
            <div className="space-y-1">
              <Label htmlFor="program-start-time" className="text-[10px] text-muted-foreground">
                Start Time
              </Label>

              <Input
                id="program-start-time"
                type="time"
                {...register('startTime', {
                  required: 'Start time is required',
                })}
              />

              {errors.startTime && (
                <p className="text-[10px] text-destructive">{errors.startTime.message}</p>
              )}
            </div>

            {/* End */}
            <div className="space-y-1">
              <Label htmlFor="program-end-time" className="text-[10px] text-muted-foreground">
                End Time
              </Label>

              <Input
                id="program-end-time"
                type="time"
                {...register('endTime', {
                  required: 'End time is required',
                })}
              />

              {errors.endTime && (
                <p className="text-[10px] text-destructive">{errors.endTime.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Number Of Periods */}
        {/* ========================================================= */}

        <div className="space-y-1.5">
          <Label htmlFor="program-number-of-periods">Number of Periods</Label>

          <Input
            id="program-number-of-periods"
            type="number"
            min={1}
            {...register('numberOfPeriods', {
              valueAsNumber: true,

              required: 'Number of periods is required',

              min: {
                value: 1,
                message: 'At least one period is required',
              },
            })}
          />

          {errors.numberOfPeriods && (
            <p className="text-[10px] text-destructive">{errors.numberOfPeriods.message}</p>
          )}
        </div>

        {/* ========================================================= */}
        {/* Working Days */}
        {/* ========================================================= */}

        <div className="space-y-2">
          <Label>Working Days</Label>

          <div className="grid grid-cols-3 gap-2">
            {WORKING_DAYS.map((day) => (
              <label
                key={day}
                className="flex cursor-pointer items-center gap-2 rounded-md border px-2 py-2 text-xs transition-colors hover:bg-muted/50"
              >
                <input
                  type="checkbox"
                  value={day}
                  {...register('workingDays', {
                    required: 'Select at least one working day',
                  })}
                  className="size-3.5"
                />

                <span>{day}</span>
              </label>
            ))}
          </div>

          {errors.workingDays && (
            <p className="text-[10px] text-destructive">{errors.workingDays.message}</p>
          )}
        </div>

        {/* ========================================================= */}
        {/* Faculty */}
        {/* ========================================================= */}

        <div className="space-y-1.5">
          <Label>Faculty</Label>

          <SelectResourceIds
            getAll={facultyService.getAll}
            initialSelectedIds={program?.resources?.facultyIds ?? []}
            setSelectedIds={setSelectedFacultyIds}
            placeholder="Search faculty..."
            renderMeta={(faculty) => (
              <>
                {faculty.email}
                {faculty.department && ` • ${faculty.department}`}
              </>
            )}
          />
        </div>

        {/* ========================================================= */}
        {/* Subjects */}
        {/* ========================================================= */}

        <div className="space-y-1.5">
          <Label>Subjects</Label>

          <SelectResourceIds
            getAll={subjectService.getAll}
            initialSelectedIds={program?.resources?.subjectIds}
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

        {/* ========================================================= */}
        {/* Rooms */}
        {/* ========================================================= */}

        <div className="space-y-1.5">
          <Label>Rooms</Label>

          <SelectResourceIds
            getAll={roomService.getAll}
            initialSelectedIds={program?.resources?.roomIds}
            setSelectedIds={setSelectedRoomIds}
            placeholder="Search rooms..."
            renderMeta={(room) => (
              <>
                {room.type}

                {room.capacity !== undefined && ` • Capacity ${room.capacity}`}
              </>
            )}
          />
        </div>

        {/* ========================================================= */}
        {/* Breaks */}
        {/* ========================================================= */}

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label>Breaks</Label>

              <p className="text-[10px] text-muted-foreground">Configure lunch and short breaks.</p>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({
                  type: 'short-break',
                  startTime: '11:00',
                  endTime: '11:15',
                })
              }
            >
              Add Break
            </Button>
          </div>

          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="rounded-md border p-3">
                <div className="grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-2">
                  {/* Type */}
                  <div className="space-y-1">
                    <Label className="text-[10px] text-muted-foreground">Type</Label>

                    <select
                      {...register(`breaks.${index}.type`)}
                      className="h-9 w-full rounded-md border bg-background px-2 text-xs"
                    >
                      <option value="lunch">Lunch</option>

                      <option value="short-break">Short Break</option>
                    </select>
                  </div>

                  {/* Start */}
                  <div className="space-y-1">
                    <Label className="text-[10px] text-muted-foreground">Start</Label>

                    <Input
                      type="time"
                      {...register(`breaks.${index}.startTime`, {
                        required: 'Start time is required',
                      })}
                    />
                  </div>

                  {/* End */}
                  <div className="space-y-1">
                    <Label className="text-[10px] text-muted-foreground">End</Label>

                    <Input
                      type="time"
                      {...register(`breaks.${index}.endTime`, {
                        required: 'End time is required',
                      })}
                    />
                  </div>

                  {/* Remove */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="h-9 w-9 text-muted-foreground hover:text-destructive"
                  >
                    ×
                  </Button>
                </div>
              </div>
            ))}

            {fields.length === 0 && (
              <div className="rounded-md border border-dashed py-5 text-center">
                <p className="text-xs text-muted-foreground">No breaks configured</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <DialogFooter>
        <div className="flex items-center justify-end gap-2">
          <Button type="button" variant="outline" onClick={close}>
            Cancel
          </Button>

          <Button type="submit">Save</Button>
        </div>
      </DialogFooter>
    </form>
  );
};

export default ProgramModal;
