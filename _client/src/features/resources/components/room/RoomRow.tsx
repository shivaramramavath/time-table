import { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';

import RoomModal from './RoomModal';

import { Button } from '@/shared/ui/button';
import { TableCell, TableRow } from '@/shared/ui/table';

import type { Room } from '../../api/RoomApi';
import { useDeleteRoom } from '../../hooks/useRoom';

type RoomRowProps = {
  room: Room;
  onDelete?: (room: Room) => void;
  onSave?: (room: Room) => void;
  isDeleting?: boolean;
  isSaving?: boolean;
};

const RoomRow = ({ room, onDelete, onSave }: RoomRowProps) => {
  const [editRoom, setEditRoom] = useState<Room | null>(null);

  const deleteRoom = useDeleteRoom();

  const handleEdit = () => {
    setEditRoom(room);
  };

  const handleDeleteRoom = () => {
    deleteRoom.mutate(room._id, {
      onSuccess: () => {
        onDelete?.(room);
      },
    });
  };

  const handleSave = (updatedRoom: Room) => {
    onSave?.(updatedRoom);
    setEditRoom(null);
  };

  const typeClass =
    room.type === 'lab'
      ? 'border-[#f9731630] bg-[#f9731615] text-[#f97316]'
      : room.type === 'seminar'
        ? 'border-[#8b5cf630] bg-[#8b5cf615] text-[#8b5cf6]'
        : room.type === 'auditorium'
          ? 'border-[#3b82f630] bg-[#3b82f615] text-[#3b82f6]'
          : room.type === 'facultyRoom'
            ? 'border-[#a855f730] bg-[#a855f715] text-[#a855f7]'
            : 'border-[#1e1e1e] bg-[#161616] text-[#a0a0a0]';

  const statusClass =
    room.status === 'available'
      ? 'border-[#22c55e30] bg-[#22c55e15] text-[#22c55e]'
      : room.status === 'maintenance'
        ? 'border-[#f59e0b30] bg-[#f59e0b15] text-[#f59e0b]'
        : 'border-[#ef444430] bg-[#ef444415] text-[#ef4444]';

  const typeLabel = {
    classroom: 'Classroom',
    lab: 'Lab',
    seminar: 'Seminar',
    auditorium: 'Auditorium',
    facultyRoom: 'Faculty Room',
  }[room.type];

  const statusLabel = {
    available: 'Available',
    unavailable: 'Unavailable',
    maintenance: 'Maintenance',
  }[room.status];

  return (
    <>
      <TableRow className="group/row">
        <TableCell className="px-4 py-3">
          <div className="min-w-0">
            <p className="text-xs font-medium">{room.name}</p>

            <p className="mt-0.5 font-mono text-[10px] text-[#555]">{room.code}</p>
          </div>
        </TableCell>

        <TableCell className="px-4 py-3">
          <span className="text-xs text-[#555]">{room.building || '—'}</span>
        </TableCell>

        <TableCell className="px-4 py-3 text-center">
          <span className="text-xs text-[#555]">{room.floor ?? '—'}</span>
        </TableCell>

        <TableCell className="px-4 py-3 text-center">
          <span className="text-xs text-[#666]">{room.capacity}</span>
        </TableCell>

        <TableCell className="px-4 py-3">
          <span className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${typeClass}`}>
            {typeLabel}
          </span>
        </TableCell>

        <TableCell className="px-4 py-3">
          <div className="flex max-w-[220px] flex-wrap gap-1">
            {room.facilities.slice(0, 2).map((facility) => (
              <span
                key={facility}
                className="rounded border border-[#1e1e1e] bg-[#161616] px-1.5 py-0.5 text-[10px] text-[#777]"
              >
                {facility}
              </span>
            ))}

            {room.facilities.length > 2 && (
              <span className="px-1 text-[10px] text-[#555]">+{room.facilities.length - 2}</span>
            )}
          </div>
        </TableCell>

        <TableCell className="px-4 py-3">
          <span className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${statusClass}`}>
            {statusLabel}
          </span>
        </TableCell>

        <TableCell className="px-4 py-3">
          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover/row:opacity-100">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={deleteRoom.isPending}
              onClick={handleEdit}
              className="h-7 w-7 rounded-md text-[#555] hover:bg-[#1e1e1e] hover:text-white"
            >
              <Edit2 size={12} />

              <span className="sr-only">Edit {room.name}</span>
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={deleteRoom.isPending}
              onClick={handleDeleteRoom}
              className="h-7 w-7 rounded-md text-[#555] hover:bg-[#ef444415] hover:text-[#ef4444]"
            >
              <Trash2 size={12} />

              <span className="sr-only">Delete {room.name}</span>
            </Button>
          </div>
        </TableCell>
      </TableRow>

      <RoomModal
        open={Boolean(editRoom)}
        room={editRoom ?? undefined}
        onClose={() => setEditRoom(null)}
        onSave={handleSave}
      />
    </>
  );
};

export default RoomRow;
