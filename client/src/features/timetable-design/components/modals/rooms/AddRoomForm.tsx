import { useForm } from 'react-hook-form';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

import type { Room } from '../../../types';
import { roomService } from '@/features/timetable-designer/services/room.service';
import { generateRoomId } from '@/features/timetable-designer/utils/generate-ids';

interface Props {
  onSave: () => void;
  onCancel: () => void;
}

type RoomFormData = {
  name: string;
  roomNumber: string;
  capacity: number;
  floor: number;
  type: Room['type'];
};

const AddRoomForm = ({ onSave, onCancel }: Props) => {
  const { register, handleSubmit } = useForm<RoomFormData>({
    defaultValues: {
      name: '',
      roomNumber: '',
      capacity: 60,
      floor: 1,
      type: 'classroom',
    },
  });

  const onSubmit = (data: RoomFormData) => {
    const room: Room = {
      id: generateRoomId(),
      name: data.name.trim() || 'New Room',
      roomNumber: data.roomNumber.trim(),
      capacity: data.capacity,
      floor: data.floor,
      type: data.type,
    };

    roomService.add(room);
    onSave();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-3">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold">Add Room</h3>

          <p className="text-[11px] text-muted-foreground">
            Create a classroom, laboratory, or seminar hall.
          </p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="name">Room Name</Label>

          <Input
            id="name"
            placeholder="e.g. CSE Classroom 1"
            {...register('name', {
              required: 'Room name is required',
            })}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="roomNumber">Room Number</Label>

          <Input
            id="roomNumber"
            placeholder="e.g. CSE-101"
            {...register('roomNumber', {
              required: 'Room number is required',
            })}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="capacity">Capacity</Label>

            <Input
              id="capacity"
              type="number"
              min={1}
              {...register('capacity', {
                valueAsNumber: true,
              })}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="floor">Floor</Label>

            <Input
              id="floor"
              type="number"
              min={0}
              {...register('floor', {
                valueAsNumber: true,
              })}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="type">Room Type</Label>

          <select
            id="type"
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
            Add Room
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddRoomForm;
