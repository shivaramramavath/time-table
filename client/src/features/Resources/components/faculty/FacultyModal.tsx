import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import type { CreateFacultyInput, Faculty } from '../../api/FacultyApi';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';

import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/shared/ui/field';

import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

import AvailabilityMatrix from './AvailabilityMatrix';
import { useCreateFaculty, useUpdateFaculty } from '../../hooks/useFaculty';

interface FacultyModalProps {
  faculty?: Faculty;
  open: boolean;
  onClose: () => void;
  onSave: (faculty: Omit<CreateFacultyInput, 'employeeId'>) => void;
}

type FacultyFormValues = Omit<CreateFacultyInput, 'employeeId'>;

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const periods = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

const createAvailability = () => days.map(() => periods.map(() => true));

const defaultValues: FacultyFormValues = {
  name: '',
  email: '',
  department: 'Computer Science & Engineering',
  subjectIds: [],
  roomId: '',
  maxPerDay: 4,
  maxPerWeek: 20,
  availability: createAvailability(),
  status: 'active',
};

const FacultyModal = ({ faculty, open, onClose }: FacultyModalProps) => {
  const createFaculty = useCreateFaculty();
  const updateFaculty = useUpdateFaculty();

  const form = useForm<FacultyFormValues>({
    defaultValues,
  });

  const availability = form.watch('availability');

  useEffect(() => {
    if (faculty) {
      form.reset({
        name: faculty.name,
        email: faculty.email,
        department: faculty.department,
        subjectIds: faculty.subjectIds,
        roomId: faculty.roomId,
        maxPerDay: faculty.maxPerDay,
        maxPerWeek: faculty.maxPerWeek,
        availability: faculty.availability,
        status: faculty.status,
      });

      return;
    }

    form.reset(defaultValues);
  }, [faculty, form]);

  const handleSubmit = async (values: FacultyFormValues) => {
    console.log(values);
    if (faculty) {
      await updateFaculty.mutate({ ...values, employeeId: faculty.employeeId });
    } else await createFaculty.mutate(values);

    onClose();
  };

  const handleAvailabilityChange = (value: boolean[][]) => {
    form.setValue('availability', value, {
      shouldDirty: true,
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          onClose();
        }
      }}
    >
      <DialogContent className="w-[540px] max-w-[calc(100%-2rem)] max-h-[90vh] gap-0 overflow-hidden rounded-xl border-[#262626] bg-[#161616] p-0 text-white">
        <DialogHeader className="border-b border-[#1e1e1e] px-6 pb-4 pt-5 text-left">
          <DialogTitle className="text-sm font-semibold text-white">
            {faculty ? 'Edit Faculty' : 'Add Faculty'}
          </DialogTitle>

          <DialogDescription className="mt-0.5 text-xs text-[#555]">
            {faculty ? 'Update faculty information.' : 'Add a new faculty member.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex min-h-0 flex-col">
          <div className="max-h-[calc(90vh-150px)] space-y-4 overflow-y-auto px-6 py-5">
            <FieldGroup>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>

                    <FieldContent>
                      <Input
                        id="name"
                        placeholder="Full name"
                        {...form.register('name', {
                          required: 'Name is required',
                        })}
                        className="h-9 border-[#262626] bg-[#101010] text-xs text-white focus-visible:ring-1 focus-visible:ring-[#6366f1]"
                      />

                      {form.formState.errors.name && (
                        <FieldError>{form.formState.errors.name.message}</FieldError>
                      )}
                    </FieldContent>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>

                    <FieldContent>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@domain.com"
                        {...form.register('email', {
                          required: 'Email is required',
                        })}
                        className="h-9 border-[#262626] bg-[#101010] text-xs text-white focus-visible:ring-1 focus-visible:ring-[#6366f1]"
                      />

                      {form.formState.errors.email && (
                        <FieldError>{form.formState.errors.email.message}</FieldError>
                      )}
                    </FieldContent>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="department">Department</FieldLabel>

                    <FieldContent>
                      <Input
                        id="department"
                        {...form.register('department', {
                          required: 'Department is required',
                        })}
                        className="h-9 border-[#262626] bg-[#101010] text-xs text-white focus-visible:ring-1 focus-visible:ring-[#6366f1]"
                      />

                      {form.formState.errors.department && (
                        <FieldError>{form.formState.errors.department.message}</FieldError>
                      )}
                    </FieldContent>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="roomId">Room ID</FieldLabel>

                    <FieldContent>
                      <Input
                        id="roomId"
                        placeholder="Select faculty room"
                        {...form.register('roomId', {
                          required: 'Room is required',
                        })}
                        className="h-9 border-[#262626] bg-[#101010] text-xs text-white focus-visible:ring-1 focus-visible:ring-[#6366f1]"
                      />

                      {form.formState.errors.roomId && (
                        <FieldError>{form.formState.errors.roomId.message}</FieldError>
                      )}
                    </FieldContent>
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field>
                      <FieldLabel htmlFor="maxPerDay">Max Periods / Day</FieldLabel>

                      <FieldContent>
                        <Input
                          id="maxPerDay"
                          type="number"
                          min={1}
                          {...form.register('maxPerDay', {
                            valueAsNumber: true,
                            min: {
                              value: 1,
                              message: 'Minimum is 1',
                            },
                          })}
                          className="h-9 border-[#262626] bg-[#101010] text-xs text-white focus-visible:ring-1 focus-visible:ring-[#6366f1]"
                        />
                      </FieldContent>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="maxPerWeek">Max Periods / Week</FieldLabel>

                      <FieldContent>
                        <Input
                          id="maxPerWeek"
                          type="number"
                          min={1}
                          {...form.register('maxPerWeek', {
                            valueAsNumber: true,
                            min: {
                              value: 1,
                              message: 'Minimum is 1',
                            },
                          })}
                          className="h-9 border-[#262626] bg-[#101010] text-xs text-white focus-visible:ring-1 focus-visible:ring-[#6366f1]"
                        />
                      </FieldContent>
                    </Field>
                  </div>

                  <Field>
                    <FieldLabel>Weekly Availability</FieldLabel>

                    <FieldContent>
                      <AvailabilityMatrix
                        days={days}
                        periods={periods}
                        value={availability}
                        onChange={handleAvailabilityChange}
                      />
                    </FieldContent>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </div>

          <DialogFooter className="flex-row gap-2 border-t border-[#1e1e1e] px-6 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-[#262626] bg-[#1a1a1a] text-xs text-[#666] hover:bg-[#222] hover:text-white"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={createFaculty.isPending || useUpdateFaculty.isPending}
              className="flex-1 bg-[#6366f1] text-xs font-medium text-white hover:bg-[#5558e8]"
            >
              {faculty ? 'Save Changes' : 'Add Faculty'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FacultyModal;
