import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import type { CreateSubjectInput, Subject } from '../../api/SubjectApi';

import { useCreateSubject, useUpdateSubject } from '../../hooks/useSubject';

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

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

type SubjectModalProps = {
  subject?: Subject;
  open: boolean;
  onClose: () => void;
  onSave?: (subject: Subject) => void;
};

type SubjectFormValues = CreateSubjectInput;

const defaultValues: SubjectFormValues = {
  code: '',
  name: '',
  type: 'theory',
  credits: 4,
  weeklyPeriods: 4,
  department: 'Computer Science & Engineering',
  semester: 1,
  requiresLab: false,
  preferredRoomIds: [],
  status: 'active',
};

const SubjectModal = ({ subject, open, onClose, onSave }: SubjectModalProps) => {
  const createSubject = useCreateSubject();
  const updateSubject = useUpdateSubject();

  const form = useForm<SubjectFormValues>({
    defaultValues,
  });

  useEffect(() => {
    if (subject) {
      form.reset({
        code: subject.code,
        name: subject.name,
        type: subject.type,
        credits: subject.credits,
        weeklyPeriods: subject.weeklyPeriods,
        department: subject.department,
        semester: subject.semester,
        requiresLab: subject.requiresLab,
        preferredRoomIds: subject.preferredRoomIds,
        status: subject.status,
      });

      return;
    }

    form.reset(defaultValues);
  }, [subject, form]);

  const handleSubmit = async (values: SubjectFormValues) => {
    if (subject) {
      const updatedSubject = await updateSubject.mutateAsync({
        id: subject.id,
        data: values,
      });

      onSave?.(updatedSubject);
    } else {
      const createdSubject = await createSubject.mutateAsync(values);

      onSave?.(createdSubject);
    }

    onClose();
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
            {subject ? 'Edit Subject' : 'Add Subject'}
          </DialogTitle>

          <DialogDescription className="mt-0.5 text-xs text-[#555]">
            {subject
              ? 'Update subject information.'
              : 'Add a new subject to your academic resources.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex min-h-0 flex-col">
          <div className="max-h-[calc(90vh-150px)] space-y-4 overflow-y-auto px-6 py-5">
            <FieldGroup>
              <FieldSet>
                <FieldGroup>
                  <div className="grid grid-cols-2 gap-3">
                    <Field>
                      <FieldLabel htmlFor="code">Subject Code</FieldLabel>

                      <FieldContent>
                        <Input
                          id="code"
                          placeholder="CS101"
                          {...form.register('code', {
                            required: 'Subject code is required',
                          })}
                          className="h-9 border-[#262626] bg-[#101010] text-xs uppercase text-white focus-visible:ring-1 focus-visible:ring-[#6366f1]"
                        />

                        {form.formState.errors.code && (
                          <FieldError>{form.formState.errors.code.message}</FieldError>
                        )}
                      </FieldContent>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="name">Subject Name</FieldLabel>

                      <FieldContent>
                        <Input
                          id="name"
                          placeholder="Data Structures"
                          {...form.register('name', {
                            required: 'Subject name is required',
                          })}
                          className="h-9 border-[#262626] bg-[#101010] text-xs text-white focus-visible:ring-1 focus-visible:ring-[#6366f1]"
                        />

                        {form.formState.errors.name && (
                          <FieldError>{form.formState.errors.name.message}</FieldError>
                        )}
                      </FieldContent>
                    </Field>
                  </div>

                  <Field>
                    <FieldLabel htmlFor="type">Subject Type</FieldLabel>

                    <FieldContent>
                      <Select
                        value={form.watch('type')}
                        onValueChange={(value: SubjectFormValues['type']) =>
                          form.setValue('type', value, {
                            shouldDirty: true,
                          })
                        }
                      >
                        <SelectTrigger className="h-9 border-[#262626] bg-[#101010] text-xs text-white">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="theory">Theory</SelectItem>

                          <SelectItem value="lab">Lab</SelectItem>

                          <SelectItem value="tutorial">Tutorial</SelectItem>
                        </SelectContent>
                      </Select>
                    </FieldContent>
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field>
                      <FieldLabel htmlFor="credits">Credits</FieldLabel>

                      <FieldContent>
                        <Input
                          id="credits"
                          type="number"
                          min={0}
                          {...form.register('credits', {
                            valueAsNumber: true,
                            min: {
                              value: 0,
                              message: 'Minimum is 0',
                            },
                          })}
                          className="h-9 border-[#262626] bg-[#101010] text-xs text-white focus-visible:ring-1 focus-visible:ring-[#6366f1]"
                        />

                        {form.formState.errors.credits && (
                          <FieldError>{form.formState.errors.credits.message}</FieldError>
                        )}
                      </FieldContent>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="weeklyPeriods">Periods / Week</FieldLabel>

                      <FieldContent>
                        <Input
                          id="weeklyPeriods"
                          type="number"
                          min={1}
                          {...form.register('weeklyPeriods', {
                            valueAsNumber: true,
                            min: {
                              value: 1,
                              message: 'Minimum is 1',
                            },
                          })}
                          className="h-9 border-[#262626] bg-[#101010] text-xs text-white focus-visible:ring-1 focus-visible:ring-[#6366f1]"
                        />

                        {form.formState.errors.weeklyPeriods && (
                          <FieldError>{form.formState.errors.weeklyPeriods.message}</FieldError>
                        )}
                      </FieldContent>
                    </Field>
                  </div>

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
                    <FieldLabel htmlFor="semester">Semester</FieldLabel>

                    <FieldContent>
                      <Input
                        id="semester"
                        type="number"
                        min={1}
                        {...form.register('semester', {
                          valueAsNumber: true,
                          min: {
                            value: 1,
                            message: 'Minimum semester is 1',
                          },
                        })}
                        className="h-9 border-[#262626] bg-[#101010] text-xs text-white focus-visible:ring-1 focus-visible:ring-[#6366f1]"
                      />

                      {form.formState.errors.semester && (
                        <FieldError>{form.formState.errors.semester.message}</FieldError>
                      )}
                    </FieldContent>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="requiresLab">Requires Lab</FieldLabel>

                    <FieldContent>
                      <Select
                        value={form.watch('requiresLab') ? 'true' : 'false'}
                        onValueChange={(value) =>
                          form.setValue('requiresLab', value === 'true', {
                            shouldDirty: true,
                          })
                        }
                      >
                        <SelectTrigger className="h-9 border-[#262626] bg-[#101010] text-xs text-white">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="false">No</SelectItem>

                          <SelectItem value="true">Yes</SelectItem>
                        </SelectContent>
                      </Select>
                    </FieldContent>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="status">Status</FieldLabel>

                    <FieldContent>
                      <Select
                        value={form.watch('status')}
                        onValueChange={(value: SubjectFormValues['status']) =>
                          form.setValue('status', value, {
                            shouldDirty: true,
                          })
                        }
                      >
                        <SelectTrigger className="h-9 border-[#262626] bg-[#101010] text-xs text-white">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>

                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
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
              disabled={createSubject.isPending || updateSubject.isPending}
              className="flex-1 bg-[#6366f1] text-xs font-medium text-white hover:bg-[#5558e8]"
            >
              {createSubject.isPending || updateSubject.isPending
                ? 'Saving...'
                : subject
                  ? 'Save Changes'
                  : 'Add Subject'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubjectModal;
