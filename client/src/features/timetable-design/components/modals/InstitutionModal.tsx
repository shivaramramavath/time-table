import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useReactFlow } from '@xyflow/react';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/shared/ui/dialog';

import { useModalStore } from '../../store/modal.store';
import { nodeService } from '../../services/node.service';
import type { Institution } from '../../types/node.types';

interface Props {
  data: {
    id: string;
  } | null;
}

type BreakType = 'lunch' | 'short-break';
type InstitutionData = Institution['data'];

type InstitutionFormData = {
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

const DEFAULT_BREAKS: InstitutionFormData['breaks'] = [
  {
    type: 'lunch',
    startTime: '13:00',
    endTime: '14:00',
  },
];

const InstitutionModal = ({ data }: Props) => {
  const close = useModalStore((state) => state.close);

  const { getNode, setNodes } = useReactFlow();

  const institution = (data?.id ? getNode(data.id)?.data : undefined) as
    InstitutionData | undefined;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<InstitutionFormData>({
    defaultValues: {
      label: institution?.label ?? '',

      startTime: institution?.time?.startTime ?? '09:00',
      endTime: institution?.time?.endTime ?? '16:30',
      numberOfPeriods: institution?.time?.numberOfPeriods ?? 7,

      workingDays: institution?.time?.workingDays ?? WORKING_DAYS,

      breaks: DEFAULT_BREAKS,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'breaks',
  });

  useEffect(() => {
    if (!institution) return;

    reset({
      label: institution.label ?? '',

      startTime: institution.time?.startTime ?? '09:00',

      endTime: institution.time?.endTime ?? '16:30',

      numberOfPeriods: institution.time?.numberOfPeriods ?? 7,

      workingDays:
        institution.time?.workingDays?.length > 0 ? institution.time.workingDays : WORKING_DAYS,

      breaks: institution.time?.breaks?.length > 0 ? institution.time.breaks : DEFAULT_BREAKS,
    });
  }, [institution, reset]);

  const handleUpdate = (formData: InstitutionFormData) => {
    if (!data?.id) return;

    const updatedData = {
      label: formData.label.trim(),

      time: {
        startTime: formData.startTime,
        endTime: formData.endTime,
        numberOfPeriods: formData.numberOfPeriods,
        workingDays: formData.workingDays,
        breaks: formData.breaks,
      },
    };

    // Backend
    nodeService.update(data.id, {
      data: updatedData,
    });

    // React Flow local state
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
      <DialogHeader>
        <DialogTitle>{institution?.label || 'Institution'}</DialogTitle>

        <DialogDescription>Configure institution timetable settings.</DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-4">
        {/* Institution Name */}
        <div className="space-y-1.5">
          <Label htmlFor="institution-label">Institution Name</Label>

          <Input
            id="institution-label"
            placeholder="e.g. PVPSIT"
            {...register('label', {
              required: 'Institution name is required',
            })}
          />

          {errors.label && <p className="text-[10px] text-destructive">{errors.label.message}</p>}
        </div>

        {/* Working Time */}
        <div className="space-y-2">
          <Label>Working Time</Label>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="institution-start-time" className="text-[10px] text-muted-foreground">
                Start Time
              </Label>

              <Input
                id="institution-start-time"
                type="time"
                {...register('startTime', {
                  required: 'Start time is required',
                })}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="institution-end-time" className="text-[10px] text-muted-foreground">
                End Time
              </Label>

              <Input
                id="institution-end-time"
                type="time"
                {...register('endTime', {
                  required: 'End time is required',
                })}
              />
            </div>
          </div>
        </div>

        {/* Number of Periods */}
        <div className="space-y-1.5">
          <Label htmlFor="number-of-periods">Number of Periods</Label>

          <Input
            id="number-of-periods"
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

        {/* Working Days */}
        <div className="space-y-2">
          <Label>Working Days</Label>

          <div className="grid grid-cols-3 gap-2">
            {WORKING_DAYS.map((day) => (
              <label
                key={day}
                className="flex cursor-pointer items-center gap-2 rounded-md border px-2 py-2 text-xs"
              >
                <input
                  type="checkbox"
                  value={day}
                  {...register('workingDays')}
                  className="size-3.5"
                />

                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Breaks */}
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

export default InstitutionModal;
