import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

import { useRoom } from '../../hooks/useRoom';

interface RoomSelectProps {
  value?: string;
  onChange: (roomId: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const RoomSelect = ({
  value,
  onChange,
  placeholder = 'Select room',
  disabled = false,
}: RoomSelectProps) => {
  const { data: rooms = [], isLoading } = useRoom();

  const isDisabled = disabled || isLoading;

  return (
    <Select value={value} onValueChange={onChange} disabled={isDisabled}>
      <SelectTrigger className="h-9 w-full text-xs">
        <SelectValue placeholder={isLoading ? 'Loading rooms...' : placeholder} />
      </SelectTrigger>

      <SelectContent className="max-h-50 overflow-y-auto">
        {rooms.length === 0 && !isLoading ? (
          <div className="px-2 py-6 text-center text-xs text-muted-foreground">
            No rooms available
          </div>
        ) : (
          rooms.map((room) => (
            <SelectItem key={room.id} value={room.id}>
              <div className="flex items-center gap-2">
                <span className="font-medium">{room.name}</span>

                <span className="text-muted-foreground">{room.code}</span>

                <span className="text-[10px] text-muted-foreground">({room.capacity})</span>
              </div>
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default RoomSelect;
