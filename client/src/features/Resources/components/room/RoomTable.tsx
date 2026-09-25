import React from 'react';
import RoomRow from './RoomRow';

import { Search } from 'lucide-react';
import { Input } from '@/shared/ui/input';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

const initialRooms = [
  // Add your room data here
  {
    id: 1,
    number: 'CR-101',
    building: 'Main Block',
    floor: 1,
    capacity: 60,
    type: 'Classroom',
    equipment: ['Projector', 'Whiteboard', 'AC'],
    status: 'available',
  },
  {
    id: 2,
    number: 'CR-102',
    building: 'Main Block',
    floor: 1,
    capacity: 45,
    type: 'Classroom',
    equipment: ['Projector', 'Whiteboard'],
    status: 'available',
  },
  {
    id: 3,
    number: 'CR-201',
    building: 'Main Block',
    floor: 2,
    capacity: 80,
    type: 'Classroom',
    equipment: ['Projector', 'Smart Board', 'AC'],
    status: 'occupied',
  },
  {
    id: 4,
    number: 'LH-301',
    building: 'Science Block',
    floor: 3,
    capacity: 120,
    type: 'Seminar Hall',
    equipment: ['Projector', 'Sound System', 'Smart Board', 'AC'],
    status: 'available',
  },
  {
    id: 5,
    number: 'LAB-101',
    building: 'Engineering Block',
    floor: 1,
    capacity: 40,
    type: 'Lab',
    equipment: ['Computers', 'Projector', 'AC'],
    status: 'available',
  },
  {
    id: 6,
    number: 'LAB-102',
    building: 'Engineering Block',
    floor: 1,
    capacity: 35,
    type: 'Lab',
    equipment: ['Computers', 'Networking Equipment', 'Projector'],
    status: 'occupied',
  },
  {
    id: 7,
    number: 'CR-302',
    building: 'Main Block',
    floor: 3,
    capacity: 50,
    type: 'Classroom',
    equipment: ['Whiteboard', 'Projector', 'AC'],
    status: 'maintenance',
  },
  {
    id: 8,
    number: 'LAB-201',
    building: 'Engineering Block',
    floor: 2,
    capacity: 30,
    type: 'Lab',
    equipment: ['Computers', 'Projector', 'AC', 'Networking Equipment'],
    status: 'available',
  },
];

const RoomTable = () => {
  const [search, setSearch] = React.useState('');

  const filteredRooms = initialRooms.filter((room) =>
    room.number.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="overflow-hidden rounded-xl border">
      {/* Toolbar */}
      <div className="flex items-center p-4">
        <div className="relative w-full max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search rooms..."
            className="h-9 border-[#1e1e1e] bg-transparent pl-9 text-xs focus-visible:ring-1 focus-visible:ring-[#6366f1]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-[#1a1a1a] hover:bg-transparent">
              {['Room', 'Building', 'Floor', 'Capacity', 'Type', 'Equipment', 'Status', ''].map(
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
            {filteredRooms.map((room) => (
              <RoomRow key={room.id} room={room} />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Empty state */}
      {filteredRooms.length === 0 && (
        <div className="py-16 text-center">
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
