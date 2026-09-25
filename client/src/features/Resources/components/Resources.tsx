import { BookOpen, DoorOpen, FlaskConical, Users, X } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

import FacultyTable from './faculty/FaclutyTable';
import SubjectTable from './subject/SubjectTable';
import RoomTable from './room/RoomTable';

type ResourceTab = 'faculty' | 'subjects' | 'rooms' | 'labs';

interface ResourcesProps {
  initialTab?: ResourceTab;
}

const TABS = [
  {
    id: 'faculty' as const,
    label: 'Faculty',
    icon: Users,
    count: 0,
  },
  {
    id: 'subjects' as const,
    label: 'Subjects',
    icon: BookOpen,
    count: 0,
  },
  {
    id: 'rooms' as const,
    label: 'Rooms',
    icon: DoorOpen,
    count: 0,
  }
];

export function SubjectChip({ label, onRemove }: { label: string; onRemove?: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-[#6366f130] bg-[#6366f115] px-2 py-0.5 text-[11px] font-medium text-[#a5b4fc]">
      {label}

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="hover:text-white"
          aria-label={`Remove ${label}`}
        >
          <X size={10} />
        </button>
      )}
    </span>
  );
}

export default function Resources({ initialTab = 'faculty' }: ResourcesProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden p-2">
      {/* Header */}
      <div>
        <h1 className="font-semibold">Resources</h1>

        <Tabs defaultValue={initialTab} className="w-full">
          {/* Tabs */}
          <TabsList className="h-auto w-full justify-start gap-1  border-b bg-transparent p-0">
            {TABS.map(({ id, label, icon: Icon, count }) => (
              <TabsTrigger
                key={id}
                value={id}
                className="group relative -mb-px gap-1.5 rounded-none border-b-2 border-transparent px-4 py-2.5 text-xs font-medium text-[#555] shadow-none hover:text-[#a0a0a0] data-[state=active]:border-[#6366f1] data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none"
              >
                <Icon size={13} />

                {label}

                <span className="ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] text-[#444] group-data-[state=active]:bg-[#6366f115] group-data-[state=active]:text-[#a5b4fc]">
                  {count}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Content */}
          <div className="py-5">
            <TabsContent value="faculty" className="mt-0">
              <FacultyTable />
            </TabsContent>

            <TabsContent value="subjects" className="mt-0">
              <SubjectTable />
            </TabsContent>

            <TabsContent value="rooms" className="mt-0">
              <RoomTable />
            </TabsContent>

            <TabsContent value="labs" className="mt-0">
              <div className="rounded-xl border border-[#1a1a1a] bg-[#0d0d0d] py-16 text-center">
                <FlaskConical size={28} className="mx-auto mb-3 text-[#222]" />

                <p className="mb-1 text-sm text-[#444]">No labs available</p>

                <p className="text-xs text-[#333]">Lab management will be available here.</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
