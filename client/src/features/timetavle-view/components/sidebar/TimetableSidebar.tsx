import { useParams } from 'react-router-dom';
import { SidebarItem } from './SidebarItem';
import { ScrollArea, ScrollBar } from '@/shared/ui/scroll-area';

const data = [
  {
    label: 'CSE',
    value: 'cse',
    children: [
      {
        label: '1st Year',
        value: 'cse-1',
        children: [
          {
            label: 'Section A',
            value: 'cse-1-a',
            children: [],
          },
          {
            label: 'Section B',
            value: 'cse-1-b',
            children: [],
          },
          {
            label: 'Section C',
            value: 'cse-1-c',
            children: [],
          },
        ],
      },
      {
        label: '2nd Year',
        value: 'cse-2',
        children: [
          {
            label: 'Section A',
            value: 'cse-2-a',
            children: [],
          },
          {
            label: 'Section B',
            value: 'cse-2-b',
            children: [],
          },
          {
            label: 'Section C',
            value: 'cse-2-c',
            children: [],
          },
        ],
      },
      {
        label: '3rd Year',
        value: 'cse-3',
        children: [
          {
            label: 'Section A',
            value: 'cse-3-a',
            children: [],
          },
          {
            label: 'Section B',
            value: 'cse-3-b',
            children: [],
          },
          {
            label: 'Section C',
            value: 'cse-3-c',
            children: [],
          },
        ],
      },
      {
        label: '4th Year',
        value: 'cse-4',
        children: [
          {
            label: 'Section A',
            value: 'cse-4-a',
            children: [],
          },
          {
            label: 'Section B',
            value: 'cse-4-b',
            children: [],
          },
          {
            label: 'Section C',
            value: 'cse-4-c',
            children: [],
          },
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
          {
            label: 'Section A',
            value: 'ece-1-a',
            children: [],
          },
          {
            label: 'Section B',
            value: 'ece-1-b',
            children: [],
          },
        ],
      },
      {
        label: '2nd Year',
        value: 'ece-2',
        children: [
          {
            label: 'Section A',
            value: 'ece-2-a',
            children: [],
          },
          {
            label: 'Section B',
            value: 'ece-2-b',
            children: [],
          },
        ],
      },
      {
        label: '3rd Year',
        value: 'ece-3',
        children: [
          {
            label: 'Section A',
            value: 'ece-3-a',
            children: [],
          },
          {
            label: 'Section B',
            value: 'ece-3-b',
            children: [],
          },
        ],
      },
      {
        label: '4th Year',
        value: 'ece-4',
        children: [
          {
            label: 'Section A',
            value: 'ece-4-a',
            children: [],
          },
          {
            label: 'Section B',
            value: 'ece-4-b',
            children: [],
          },
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
          {
            label: 'Section A',
            value: 'eee-1-a',
            children: [],
          },
          {
            label: 'Section B',
            value: 'eee-1-b',
            children: [],
          },
        ],
      },
      {
        label: '2nd Year',
        value: 'eee-2',
        children: [
          {
            label: 'Section A',
            value: 'eee-2-a',
            children: [],
          },
          {
            label: 'Section B',
            value: 'eee-2-b',
            children: [],
          },
        ],
      },
      {
        label: '3rd Year',
        value: 'eee-3',
        children: [
          {
            label: 'Section A',
            value: 'eee-3-a',
            children: [],
          },
          {
            label: 'Section B',
            value: 'eee-3-b',
            children: [],
          },
        ],
      },
      {
        label: '4th Year',
        value: 'eee-4',
        children: [
          {
            label: 'Section A',
            value: 'eee-4-a',
            children: [],
          },
          {
            label: 'Section B',
            value: 'eee-4-b',
            children: [],
          },
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
          {
            label: 'Section A',
            value: 'civil-1-a',
            children: [],
          },
          {
            label: 'Section B',
            value: 'civil-1-b',
            children: [],
          },
        ],
      },
      {
        label: '2nd Year',
        value: 'civil-2',
        children: [
          {
            label: 'Section A',
            value: 'civil-2-a',
            children: [],
          },
          {
            label: 'Section B',
            value: 'civil-2-b',
            children: [],
          },
        ],
      },
      {
        label: '3rd Year',
        value: 'civil-3',
        children: [
          {
            label: 'Section A',
            value: 'civil-3-a',
            children: [],
          },
          {
            label: 'Section B',
            value: 'civil-3-b',
            children: [],
          },
        ],
      },
      {
        label: '4th Year',
        value: 'civil-4',
        children: [
          {
            label: 'Section A',
            value: 'civil-4-a',
            children: [],
          },
          {
            label: 'Section B',
            value: 'civil-4-b',
            children: [],
          },
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
          {
            label: 'Section A',
            value: 'mech-1-a',
            children: [],
          },
          {
            label: 'Section B',
            value: 'mech-1-b',
            children: [],
          },
        ],
      },
      {
        label: '2nd Year',
        value: 'mech-2',
        children: [
          {
            label: 'Section A',
            value: 'mech-2-a',
            children: [],
          },
          {
            label: 'Section B',
            value: 'mech-2-b',
            children: [],
          },
        ],
      },
      {
        label: '3rd Year',
        value: 'mech-3',
        children: [
          {
            label: 'Section A',
            value: 'mech-3-a',
            children: [],
          },
          {
            label: 'Section B',
            value: 'mech-3-b',
            children: [],
          },
        ],
      },
      {
        label: '4th Year',
        value: 'mech-4',
        children: [
          {
            label: 'Section A',
            value: 'mech-4-a',
            children: [],
          },
          {
            label: 'Section B',
            value: 'mech-4-b',
            children: [],
          },
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
    <aside className="w-64 shrink-0 border-r">
      <ScrollArea className="h-full">
        <nav className="space-y-1 p-3">
          {data.map((item) => (
            <SidebarItem key={item.value} item={item} basePath={basePath} />
          ))}
        </nav>

        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </aside>
  );
};

export default TimetableSidebar;
