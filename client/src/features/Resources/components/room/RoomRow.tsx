import { Trash2 } from 'lucide-react';

import type { Room } from '../../data/types';

import { Button } from '@/shared/ui/button';
import { TableCell, TableRow } from '@/shared/ui/table';

type RoomRowProps = {
  room: Room;
  onDelete?: (room: Room) => void;
};

const RoomRow = ({ room, onDelete }: RoomRowProps) => {
  const handleDelete = () => {
    onDelete?.(room);
  };

  const typeClass =
    room.type === 'Lab'
      ? 'border-[#f9731630] bg-[#f9731615] text-[#f97316]'
      : room.type === 'Seminar Hall'
        ? 'border-[#8b5cf630] bg-[#8b5cf615] text-[#8b5cf6]'
        : 'border-[#1e1e1e] bg-[#161616] text-[#a0a0a0]';

  const statusClass =
    room.status === 'available'
      ? 'border-[#22c55e30] bg-[#22c55e15] text-[#22c55e]'
      : 'border-[#1e1e1e] bg-[#161616] text-[#555]';

  return (
    <TableRow className="group/row">
      {/* Room */}
      <TableCell className="px-4 py-3">
        <span className="text-xs font-medium">{room.number}</span>
      </TableCell>

      {/* Building */}
      <TableCell className="px-4 py-3">
        <span className="text-xs text-[#555]">{room.building}</span>
      </TableCell>

      {/* Floor */}
      <TableCell className="px-4 py-3 text-center">
        <span className="text-xs text-[#555]">{room.floor}</span>
      </TableCell>

      {/* Capacity */}
      <TableCell className="px-4 py-3 text-center">
        <span className="text-xs text-[#666]">{room.capacity}</span>
      </TableCell>

      {/* Type */}
      <TableCell className="px-4 py-3">
        <span className={`rounded-md border px-2 py-0.5 text-[10px] ${typeClass}`}>
          {room.type}
        </span>
      </TableCell>

      {/* Equipment */}
      <TableCell className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {room.equipment.slice(0, 2).map((equipment) => (
            <span
              key={equipment}
              className="rounded border px-1.5 py-0.5 text-[10px]"
            >
              {equipment}
            </span>
          ))}

          {room.equipment.length > 2 && (
            <span className="text-[10px] ">+{room.equipment.length - 2}</span>
          )}
        </div>
      </TableCell>

      {/* Status */}
      <TableCell className="px-4 py-3">
        <span className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${statusClass}`}>
          {room.status === 'available' ? 'Available' : 'Unavailable'}
        </span>
      </TableCell>

      {/* Actions */}
      <TableCell className="px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          className="h-7 w-7 rounded-md text-[#555] opacity-0 transition-all hover:bg-[#ef444415] hover:text-[#ef4444] group-hover/row:opacity-100"
        >
          <Trash2 size={12} />

          <span className="sr-only">Delete room {room.number}</span>
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default RoomRow;
