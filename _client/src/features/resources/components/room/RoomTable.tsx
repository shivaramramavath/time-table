import { DoorOpen } from 'lucide-react';

import RoomRow from './RoomRow';

import { useRoom } from '../../hooks/useRoom';

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import LoadingComponent from '@/shared/components/LoadingComponent';
import ErrorComponent from '@/shared/components/ErrorComponent';

type RoomTableProps = {
  search: string;
};

const RoomTable = ({ search }: RoomTableProps) => {
  const { data: rooms = [], isLoading, isError, error, refetch } = useRoom(search);

  if (isLoading) {
    return (
      <LoadingComponent
        message="Loading rooms"
        description="Please wait while we fetch the room information."
      />
    );
  }

  if (isError) {
    return (
      <ErrorComponent
        error={error instanceof Error ? error.message : 'Failed to load rooms.'}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      {rooms.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-[#1a1a1a] hover:bg-transparent">
                {['Room', 'Building', 'Floor', 'Capacity', 'Type', 'Facilities', 'Status'].map(
                  (heading) => (
                    <TableHead
                      key={heading}
                      className="h-auto px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#444]"
                    >
                      {heading}
                    </TableHead>
                  ),
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              {rooms.map((room) => (
                <RoomRow key={room.id} room={room} />
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="py-16 text-center">
          <DoorOpen size={28} className="mx-auto mb-3 text-[#222]" />

          <p className="mb-1 text-sm text-[#333]">
            {search ? 'No rooms found' : 'No rooms added yet'}
          </p>

          <p className="text-xs text-[#222]">
            {search ? `No rooms match "${search}"` : 'Add rooms to manage classroom availability'}
          </p>
        </div>
      )}
    </div>
  );
};

export default RoomTable;
