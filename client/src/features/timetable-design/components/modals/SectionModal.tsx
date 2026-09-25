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

import type { Section } from '../../types/node.types';

interface Props {
  data: {
    id?: string;
  } | null;
}

type BreakType = 'lunch' | 'short-break';

type SectionFormData = {
  label: string;
  section: string;
  strength: number;

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

const DEFAULT_BREAKS: SectionFormData['breaks'] = [
  {
    type: 'lunch',
    startTime: '13:00',
    endTime: '14:00',
  },
];

const SectionModal = ({ data }: Props) => {
  const close = useModalStore((state) => state.close);

  const { getNode, setNodes } = useReactFlow();

  const section = (data?.id ? getNode(data.id)?.data : undefined) as Section['data'] | undefined;

  /*
   * Resource selections
   */
  const [selectedFacultyIds, setSelectedFacultyIds] = useState<string[]>(
    section?.resources?.facultyIds ?? [],
  );

  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>(
    section?.resources?.subjectIds ?? [],
  );

  const [selectedRoomIds, setSelectedRoomIds] = useState<string[]>(
    section?.resources?.roomIds ?? [],
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
  } = useForm<SectionFormData>({
    defaultValues: {
      label: section?.label ?? '',

      section: section?.section ?? '',

      strength: section?.strength ?? 60,

      startTime: section?.time?.startTime ?? '09:00',

      endTime: section?.time?.endTime ?? '17:00',

      numberOfPeriods: section?.time?.numberOfPeriods ?? 7,

      workingDays: section?.time?.workingDays?.length ? section.time.workingDays : WORKING_DAYS,

      breaks: section?.time?.breaks?.length ? section.time.breaks : DEFAULT_BREAKS,
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
   * Load section data
   */
  useEffect(() => {
    if (!section) return;

    reset({
      label: section.label ?? '',

      section: section.section ?? '',

      strength: section.strength ?? 60,

      startTime: section.time?.startTime ?? '09:00',

      endTime: section.time?.endTime ?? '17:00',

      numberOfPeriods: section.time?.numberOfPeriods ?? 7,

      workingDays: section.time?.workingDays?.length ? section.time.workingDays : WORKING_DAYS,

      breaks: section.time?.breaks?.length ? section.time.breaks : DEFAULT_BREAKS,
    });

    setSelectedFacultyIds(section.resources?.facultyIds ?? []);

    setSelectedSubjectIds(section.resources?.subjectIds ?? []);

    setSelectedRoomIds(section.resources?.roomIds ?? []);
  }, [section, reset]);

  /*
   * Submit
   */
  const handleUpdate = (formData: SectionFormData) => {
    if (!data?.id) return;

    const updatedData = {
      ...section,

      label: formData.label.trim(),

      section: formData.section.trim(),

      strength: formData.strength,

      time: {
        ...section?.time,

        startTime: formData.startTime,
        endTime: formData.endTime,
        numberOfPeriods: formData.numberOfPeriods,
        workingDays: formData.workingDays,
        breaks: formData.breaks,
      },

      resources: {
        ...section?.resources,

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
              data: {
                ...node.data,
                ...updatedData,
              },
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
        <DialogTitle>{section?.label || 'Section'}</DialogTitle>

        <DialogDescription>Configure section timetable settings.</DialogDescription>
      </DialogHeader>

      <div className="max-h-[70vh] space-y-4 overflow-y-auto py-4 scrollbar">
        {/* ================================================= */}
        {/* Section Label */}
        {/* ================================================= */}

        <div className="space-y-1.5">
          <Label htmlFor="section-label">Section Name</Label>

          <Input
            id="section-label"
            placeholder="e.g. CSE-A"
            {...register('label', {
              required: 'Section name is required',
            })}
          />

          {errors.label && <p className="text-[10px] text-destructive">{errors.label.message}</p>}
        </div>

        {/* ================================================= */}
        {/* Section */}
        {/* ================================================= */}

        <div className="space-y-1.5">
          <Label htmlFor="section">Section</Label>

          <Input
            id="section"
            placeholder="e.g. A"
            {...register('section', {
              required: 'Section is required',
            })}
          />

          {errors.section && (
            <p className="text-[10px] text-destructive">{errors.section.message}</p>
          )}
        </div>

        {/* ================================================= */}
        {/* Student Strength */}
        {/* ================================================= */}

        <div className="space-y-1.5">
          <Label htmlFor="section-strength">Student Strength</Label>

          <Input
            id="section-strength"
            type="number"
            min={1}
            placeholder="60"
            {...register('strength', {
              valueAsNumber: true,

              required: 'Student strength is required',

              min: {
                value: 1,
                message: 'Strength must be at least 1',
              },
            })}
          />

          {errors.strength && (
            <p className="text-[10px] text-destructive">{errors.strength.message}</p>
          )}
        </div>

        {/* ================================================= */}
        {/* Working Time */}
        {/* ================================================= */}

        <div className="space-y-2">
          <Label>Working Time</Label>

          <div className="grid grid-cols-2 gap-3">
            {/* Start */}
            <div className="space-y-1">
              <Label htmlFor="section-start-time" className="text-[10px] text-muted-foreground">
                Start Time
              </Label>

              <Input
                id="section-start-time"
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
              <Label htmlFor="section-end-time" className="text-[10px] text-muted-foreground">
                End Time
              </Label>

              <Input
                id="section-end-time"
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

        {/* ================================================= */}
        {/* Number Of Periods */}
        {/* ================================================= */}

        <div className="space-y-1.5">
          <Label htmlFor="section-number-of-periods">Number of Periods</Label>

          <Input
            id="section-number-of-periods"
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

        {/* ================================================= */}
        {/* Working Days */}
        {/* ================================================= */}

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

        {/* ================================================= */}
        {/* Faculty */}
        {/* ================================================= */}

        <div className="space-y-1.5">
          <Label>Faculty</Label>

          <SelectResourceIds
            getAll={facultyService.getAll}
            initialSelectedIds={section?.resources?.facultyIds ?? []}
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

        {/* ================================================= */}
        {/* Subjects */}
        {/* ================================================= */}

        <div className="space-y-1.5">
          <Label>Subjects</Label>

          <SelectResourceIds
            getAll={subjectService.getAll}
            initialSelectedIds={section?.resources?.subjectIds ?? []}
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

        {/* ================================================= */}
        {/* Rooms */}
        {/* ================================================= */}

        <div className="space-y-1.5">
          <Label>Rooms</Label>

          <SelectResourceIds
            getAll={roomService.getAll}
            initialSelectedIds={section?.resources?.roomIds ?? []}
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

        {/* ================================================= */}
        {/* Breaks */}
        {/* ================================================= */}

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

export default SectionModal;
