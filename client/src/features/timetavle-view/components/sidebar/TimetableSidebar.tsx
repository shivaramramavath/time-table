import { useParams } from 'react-router-dom';

import { SidebarItem } from './SidebarItem';
import { CalendarDays } from 'lucide-react';
const data = [
  {
    label: 'CSE',
    value: 'cse',
    children: [
      {
        label: '1st Year',
        value: 'cse-1',
        children: [
          { label: 'Section A', value: 'cse-1-a', children: [] },
          { label: 'Section B', value: 'cse-1-b', children: [] },
          { label: 'Section C', value: 'cse-1-c', children: [] },
        ],
      },
      {
        label: '2nd Year',
        value: 'cse-2',
        children: [
          { label: 'Section A', value: 'cse-2-a', children: [] },
          { label: 'Section B', value: 'cse-2-b', children: [] },
          { label: 'Section C', value: 'cse-2-c', children: [] },
        ],
      },
      {
        label: '3rd Year',
        value: 'cse-3',
        children: [
          { label: 'Section A', value: 'cse-3-a', children: [] },
          { label: 'Section B', value: 'cse-3-b', children: [] },
          { label: 'Section C', value: 'cse-3-c', children: [] },
        ],
      },
      {
        label: '4th Year',
        value: 'cse-4',
        children: [
          { label: 'Section A', value: 'cse-4-a', children: [] },
          { label: 'Section B', value: 'cse-4-b', children: [] },
          { label: 'Section C', value: 'cse-4-c', children: [] },
        ],
      },
    ],
  },
  {
    label: 'ECE',
    value: 'ece',
    children: [
      {
        label: '1st Year',
        value: 'ece-1',
        children: [
          { label: 'Section A', value: 'ece-1-a', children: [] },
          { label: 'Section B', value: 'ece-1-b', children: [] },
        ],
      },
      {
        label: '2nd Year',
        value: 'ece-2',
        children: [
          { label: 'Section A', value: 'ece-2-a', children: [] },
          { label: 'Section B', value: 'ece-2-b', children: [] },
        ],
      },
      {
        label: '3rd Year',
        value: 'ece-3',
        children: [
          { label: 'Section A', value: 'ece-3-a', children: [] },
          { label: 'Section B', value: 'ece-3-b', children: [] },
        ],
      },
      {
        label: '4th Year',
        value: 'ece-4',
        children: [
          { label: 'Section A', value: 'ece-4-a', children: [] },
          { label: 'Section B', value: 'ece-4-b', children: [] },
        ],
      },
    ],
  },
  {
    label: 'EEE',
    value: 'eee',
    children: [
      {
        label: '1st Year',
        value: 'eee-1',
        children: [
          { label: 'Section A', value: 'eee-1-a', children: [] },
          { label: 'Section B', value: 'eee-1-b', children: [] },
        ],
      },
      {
        label: '2nd Year',
        value: 'eee-2',
        children: [
          { label: 'Section A', value: 'eee-2-a', children: [] },
          { label: 'Section B', value: 'eee-2-b', children: [] },
        ],
      },
      {
        label: '3rd Year',
        value: 'eee-3',
        children: [
          { label: 'Section A', value: 'eee-3-a', children: [] },
          { label: 'Section B', value: 'eee-3-b', children: [] },
        ],
      },
      {
        label: '4th Year',
        value: 'eee-4',
        children: [
          { label: 'Section A', value: 'eee-4-a', children: [] },
          { label: 'Section B', value: 'eee-4-b', children: [] },
        ],
      },
    ],
  },
  {
    label: 'CIVIL',
    value: 'civil',
    children: [
      {
        label: '1st Year',
        value: 'civil-1',
        children: [
          { label: 'Section A', value: 'civil-1-a', children: [] },
          { label: 'Section B', value: 'civil-1-b', children: [] },
        ],
      },
      {
        label: '2nd Year',
        value: 'civil-2',
        children: [
          { label: 'Section A', value: 'civil-2-a', children: [] },
          { label: 'Section B', value: 'civil-2-b', children: [] },
        ],
      },
      {
        label: '3rd Year',
        value: 'civil-3',
        children: [
          { label: 'Section A', value: 'civil-3-a', children: [] },
          { label: 'Section B', value: 'civil-3-b', children: [] },
        ],
      },
      {
        label: '4th Year',
        value: 'civil-4',
        children: [
          { label: 'Section A', value: 'civil-4-a', children: [] },
          { label: 'Section B', value: 'civil-4-b', children: [] },
        ],
      },
    ],
  },
  {
    label: 'MECH',
    value: 'mech',
    children: [
      {
        label: '1st Year',
        value: 'mech-1',
        children: [
          { label: 'Section A', value: 'mech-1-a', children: [] },
          { label: 'Section B', value: 'mech-1-b', children: [] },
        ],
      },
      {
        label: '2nd Year',
        value: 'mech-2',
        children: [
          { label: 'Section A', value: 'mech-2-a', children: [] },
          { label: 'Section B', value: 'mech-2-b', children: [] },
        ],
      },
      {
        label: '3rd Year',
        value: 'mech-3',
        children: [
          { label: 'Section A', value: 'mech-3-a', children: [] },
          { label: 'Section B', value: 'mech-3-b', children: [] },
        ],
      },
      {
        label: '4th Year',
        value: 'mech-4',
        children: [
          { label: 'Section A', value: 'mech-4-a', children: [] },
          { label: 'Section B', value: 'mech-4-b', children: [] },
        ],
      },
    ],
  },
];

const TimetableSidebar = () => {
  const { timetableId } = useParams<{
    timetableId: string;
  }>();

  if (!timetableId) {
    return null;
  }

  const basePath = `/timetables/${timetableId}/view`;

  return (
    <aside className="w-64 shrink-0 border-r border-border/60 bg-background">
      <div className="flex h-14 shrink-0 items-center gap-2.5 border-b border-border/60 px-4">
        <div className="flex size-7 items-center justify-center rounded-md border border-primary/20 bg-primary/10">
          <CalendarDays size={14} className="text-primary" strokeWidth={1.8} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-xs font-semibold tracking-tight">PVPSIT</p>

          <p className="truncate text-[10px] text-muted-foreground">Timetable</p>
        </div>
      </div>
      <div className="h-full overflow-y-auto scrollbar">
        <nav className="px-2 py-3">
          {data.map((item) => (
            <SidebarItem key={item.value} item={item} basePath={basePath} />
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default TimetableSidebar;
