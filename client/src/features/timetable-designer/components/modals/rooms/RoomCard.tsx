import { memo } from 'react';
import {
  ChevronRight,
  DoorOpen,
  FlaskConical,
  Layers3,
  MoreHorizontal,
  Presentation,
  Users,
} from 'lucide-react';

import { Button } from '@/shared/ui/button';

import { roomService } from '../../../services/room.service';
import type { Room } from '../../../types';

interface Props {
  room: Room;
  onEdit: (roomId: string) => void;
}

const RoomCard = ({ room, onEdit }: Props) => {
  const handleDelete = async (roomId: string) => {
    await roomService.remove(roomId);
  };

  const config = {
    classroom: {
      label: 'Classroom',
      icon: DoorOpen,
      iconClass: 'text-blue-500 bg-blue-500/10',
      badgeClass: 'text-blue-500 bg-blue-500/10',
    },
    laboratory: {
      label: 'Laboratory',
      icon: FlaskConical,
      iconClass: 'text-violet-500 bg-violet-500/10',
      badgeClass: 'text-violet-500 bg-violet-500/10',
    },
    'seminar-hall': {
      label: 'Seminar Hall',
      icon: Presentation,
      iconClass: 'text-orange-500 bg-orange-500/10',
      badgeClass: 'text-orange-500 bg-orange-500/10',
    },
  }[room.type];

  const Icon = config.icon;

  return (
    <div
      onClick={() => onEdit(room.id)}
      className="group flex cursor-pointer items-center gap-3 rounded-lg border bg-background px-3 py-2.5 transition-all hover:border-muted-foreground/30 hover:bg-muted/30 hover:shadow-sm"
    >
      <div
        className={`flex size-9 shrink-0 items-center justify-center rounded-md ${config.iconClass}`}
      >
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-xs font-semibold">{room.name}</p>

          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-medium ${config.badgeClass}`}
          >
            {room.type === 'laboratory' ? 'LAB' : room.type === 'seminar-hall' ? 'HALL' : 'ROOM'}
          </span>
        </div>

        <div className="mt-1.5 flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="font-medium text-foreground/70">{room.roomNumber || 'No number'}</span>

          <span className="flex items-center gap-1">
            <Users className="size-3" />
            {room.capacity}
          </span>

          <span className="flex items-center gap-1">
            <Layers3 className="size-3" />
            Floor {room.floor}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center">
        <Button
          variant="ghost"
          size="icon"
          className="size-7 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={(event) => {
            event.stopPropagation();
            handleDelete(room.id);
          }}
        >
          <MoreHorizontal className="size-3.5" />
        </Button>

        <ChevronRight className="size-4 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
      </div>
    </div>
  );
};

export default memo(RoomCard);
