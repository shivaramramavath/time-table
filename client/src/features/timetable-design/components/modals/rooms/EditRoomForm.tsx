import { memo } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

import { roomService } from '@/features/timetable-designer/services/room.service';

import type { Room } from '../../../types';

interface Props {
  roomId: string;
  onCancel: () => void;
  onSave: () => void;
}

type RoomFormData = {
  name: string;
  roomNumber: string;
  capacity: number;
  floor: number;
  type: Room['type'];
};

const EditRoomForm = ({ roomId, onCancel, onSave }: Props) => {
  const room = roomService.getById(roomId);

  const { register, handleSubmit } = useForm<RoomFormData>({
    defaultValues: room
      ? {
          name: room.name,
          roomNumber: room.roomNumber,
          capacity: room.capacity,
          floor: room.floor,
          type: room.type,
        }
      : undefined,
  });

  if (!room) {
    return null;
  }

  const onSubmit = (data: RoomFormData) => {
    const updatedRoom: Room = {
      ...room,
      name: data.name.trim() || 'New Room',
      roomNumber: data.roomNumber.trim(),
      capacity: data.capacity,
      floor: data.floor,
      type: data.type,
    };

    roomService.update(roomId, updatedRoom);

    onSave();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-3">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold">Edit Room</h3>

          <p className="text-[11px] text-muted-foreground">Update room details.</p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="room-name">Room Name</Label>

          <Input
            id="room-name"
            placeholder="e.g. CSE Classroom 1"
            {...register('name', {
              required: 'Room name is required',
            })}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="room-number">Room Number</Label>

          <Input
            id="room-number"
            placeholder="e.g. CSE-101"
            {...register('roomNumber', {
              required: 'Room number is required',
            })}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="room-capacity">Capacity</Label>

            <Input
              id="room-capacity"
              type="number"
              min={1}
              {...register('capacity', {
                valueAsNumber: true,
              })}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="room-floor">Floor</Label>

            <Input
              id="room-floor"
              type="number"
              min={0}
              {...register('floor', {
                valueAsNumber: true,
              })}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="room-type">Room Type</Label>

          <select
            id="room-type"
            {...register('type')}
            className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          >
            <option value="classroom">Classroom</option>
            <option value="laboratory">Laboratory</option>
            <option value="seminar-hall">Seminar Hall</option>
          </select>
        </div>

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

export default memo(EditRoomForm);
