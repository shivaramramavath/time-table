import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import type { CreateRoomInput, Room } from '../../api/RoomApi';

import { useCreateRoom, useUpdateRoom } from '../../hooks/useRoom';

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

interface RoomModalProps {
  room?: Room;
  open: boolean;
  onClose: () => void;
  onSave?: (room: Room) => void;
}

type RoomFormValues = CreateRoomInput;

const defaultValues: RoomFormValues = {
  name: '',
  code: '',
  type: 'classroom',
  capacity: 30,
  building: '',
  floor: 1,
  facilities: [],
  status: 'available',
};

const RoomModal = ({ room, open, onClose, onSave }: RoomModalProps) => {
  const createRoom = useCreateRoom();
  const updateRoom = useUpdateRoom();

  const form = useForm<RoomFormValues>({
    defaultValues,
  });

  const facilities = form.watch('facilities');

  useEffect(() => {
    if (room) {
      form.reset({
        name: room.name,
        code: room.code,
        type: room.type,
        capacity: room.capacity,
        building: room.building ?? '',
        floor: room.floor ?? 1,
        facilities: room.facilities,
        status: room.status,
      });

      return;
    }

    form.reset(defaultValues);
  }, [room, form]);

  const handleSubmit = async (values: RoomFormValues) => {
    if (room) {
      const updatedRoom = await updateRoom.mutateAsync({
        id: room.id,
        data: values,
      });

      onSave?.(updatedRoom);
    } else {
      const createdRoom = await createRoom.mutateAsync(values);

      onSave?.(createdRoom);
    }

    onClose();
  };

  const handleFacilitiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const nextFacilities = value
      .split(',')
      .map((facility) => facility.trim())
      .filter(Boolean);

    form.setValue('facilities', nextFacilities, {
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
            {room ? 'Edit Room' : 'Add Room'}
          </DialogTitle>

          <DialogDescription className="mt-0.5 text-xs text-[#555]">
            {room ? 'Update room information.' : 'Add a new room to your resources.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex min-h-0 flex-col">
          <div className="max-h-[calc(90vh-150px)] space-y-4 overflow-y-auto px-6 py-5">
            <FieldGroup>
              <FieldSet>
                <FieldGroup>
                  <div className="grid grid-cols-2 gap-3">
                    <Field>
                      <FieldLabel htmlFor="name">Room Name</FieldLabel>

                      <FieldContent>
                        <Input
                          id="name"
                          placeholder="Computer Lab 1"
                          {...form.register('name', {
                            required: 'Room name is required',
                          })}
                          className="h-9 border-[#262626] bg-[#101010] text-xs text-white focus-visible:ring-1 focus-visible:ring-[#6366f1]"
                        />

                        {form.formState.errors.name && (
                          <FieldError>{form.formState.errors.name.message}</FieldError>
                        )}
                      </FieldContent>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="code">Room Code</FieldLabel>

                      <FieldContent>
                        <Input
                          id="code"
                          placeholder="LAB-101"
                          {...form.register('code', {
                            required: 'Room code is required',
                          })}
                          className="h-9 border-[#262626] bg-[#101010] text-xs uppercase text-white focus-visible:ring-1 focus-visible:ring-[#6366f1]"
                        />

                        {form.formState.errors.code && (
                          <FieldError>{form.formState.errors.code.message}</FieldError>
                        )}
                      </FieldContent>
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Field>
                      <FieldLabel htmlFor="type">Room Type</FieldLabel>

                      <FieldContent>
                        <Select
                          value={form.watch('type')}
                          onValueChange={(value: RoomFormValues['type']) =>
                            form.setValue('type', value, {
                              shouldDirty: true,
                            })
                          }
                        >
                          <SelectTrigger className="h-9 border-[#262626] bg-[#101010] text-xs text-white">
                            <SelectValue placeholder="Select room type" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="classroom">Classroom</SelectItem>

                            <SelectItem value="lab">Lab</SelectItem>

                            <SelectItem value="seminar">Seminar</SelectItem>

                            <SelectItem value="auditorium">Auditorium</SelectItem>

                            <SelectItem value="facultyRoom">Faculty Room</SelectItem>
                          </SelectContent>
                        </Select>
                      </FieldContent>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="capacity">Capacity</FieldLabel>

                      <FieldContent>
                        <Input
                          id="capacity"
                          type="number"
                          min={1}
                          {...form.register('capacity', {
                            valueAsNumber: true,
                            required: 'Capacity is required',
                            min: {
                              value: 1,
                              message: 'Minimum capacity is 1',
                            },
                          })}
                          className="h-9 border-[#262626] bg-[#101010] text-xs text-white focus-visible:ring-1 focus-visible:ring-[#6366f1]"
                        />

                        {form.formState.errors.capacity && (
                          <FieldError>{form.formState.errors.capacity.message}</FieldError>
                        )}
                      </FieldContent>
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Field>
                      <FieldLabel htmlFor="building">Building</FieldLabel>

                      <FieldContent>
                        <Input
                          id="building"
                          placeholder="Main Block"
                          {...form.register('building')}
                          className="h-9 border-[#262626] bg-[#101010] text-xs text-white focus-visible:ring-1 focus-visible:ring-[#6366f1]"
                        />
                      </FieldContent>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="floor">Floor</FieldLabel>

                      <FieldContent>
                        <Input
                          id="floor"
                          type="number"
                          min={0}
                          {...form.register('floor', {
                            valueAsNumber: true,
                            min: {
                              value: 0,
                              message: 'Floor cannot be negative',
                            },
                          })}
                          className="h-9 border-[#262626] bg-[#101010] text-xs text-white focus-visible:ring-1 focus-visible:ring-[#6366f1]"
                        />

                        {form.formState.errors.floor && (
                          <FieldError>{form.formState.errors.floor.message}</FieldError>
                        )}
                      </FieldContent>
                    </Field>
                  </div>

                  <Field>
                    <FieldLabel htmlFor="facilities">Facilities</FieldLabel>

                    <FieldContent>
                      <Input
                        id="facilities"
                        value={facilities.join(', ')}
                        onChange={handleFacilitiesChange}
                        placeholder="Projector, Whiteboard, AC"
                        className="h-9 border-[#262626] bg-[#101010] text-xs text-white focus-visible:ring-1 focus-visible:ring-[#6366f1]"
                      />

                      <p className="text-[10px] text-[#555]">Separate facilities with commas.</p>
                    </FieldContent>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="status">Status</FieldLabel>

                    <FieldContent>
                      <Select
                        value={form.watch('status')}
                        onValueChange={(value: RoomFormValues['status']) =>
                          form.setValue('status', value, {
                            shouldDirty: true,
                          })
                        }
                      >
                        <SelectTrigger className="h-9 border-[#262626] bg-[#101010] text-xs text-white">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="available">Available</SelectItem>

                          <SelectItem value="unavailable">Unavailable</SelectItem>

                          <SelectItem value="maintenance">Maintenance</SelectItem>
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
              disabled={createRoom.isPending || updateRoom.isPending}
              className="flex-1 bg-[#6366f1] text-xs font-medium text-white hover:bg-[#5558e8]"
            >
              {createRoom.isPending || updateRoom.isPending
                ? 'Saving...'
                : room
                  ? 'Save Changes'
                  : 'Add Room'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RoomModal;
