import { memo, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { useDesignerStore } from '../../../store/designer.store';

import RoomCard from './RoomCard';

interface Props {
  onAdd: () => void;
  onEdit: (roomId: string) => void;
}

const RoomList = ({ onAdd, onEdit }: Props) => {
  const [search, setSearch] = useState('');

  const rooms = useDesignerStore((state) => state.rooms);

  const filteredRooms = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return rooms;
    }

    return rooms.filter(
      (room) =>
        room.name.toLowerCase().includes(query) ||
        room.roomNumber.toLowerCase().includes(query) ||
        room.type.toLowerCase().includes(query),
    );
  }, [rooms, search]);

  return (
    <div className="flex h-[70vh] flex-col">
      {/* Header */}
      <div className="shrink-0 space-y-3 border-b pb-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold tracking-tight">Rooms</h3>

              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                {rooms.length}
              </span>
            </div>

            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Manage classrooms, laboratories and halls
            </p>
          </div>

          <Button size="sm" onClick={onAdd} className="h-8 gap-1.5 rounded-md">
            <Plus size={14} />
            Add Room
          </Button>
        </div>

        {/* Search */}
        <Input
          placeholder="Search room..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-8 bg-muted/30 text-xs"
        />
      </div>

      {/* List */}
      <div className="scrollbar min-h-0 flex-1 overflow-y-auto py-3">
        <div className="grid grid-cols-1 gap-2">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} onEdit={onEdit} />
          ))}
        </div>

        {/* Empty state */}
        {!filteredRooms.length && (
          <div className="flex min-h-48 flex-col items-center justify-center px-6 text-center">
            <p className="text-xs font-medium">{search ? 'No rooms found' : 'No rooms yet'}</p>

            <p className="mt-1 max-w-52 text-[10px] leading-relaxed text-muted-foreground">
              {search
                ? 'Try searching with another room name, number or type.'
                : 'Add classrooms, laboratories or seminar halls to your timetable.'}
            </p>

            {!search && (
              <Button size="sm" variant="outline" className="mt-3 h-7 text-[11px]" onClick={onAdd}>
                <Plus size={13} />
                Add Room
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(RoomList);
