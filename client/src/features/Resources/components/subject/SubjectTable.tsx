import React from 'react';
import { Search } from 'lucide-react';

import SubjectRow from './SubjectRow';

import { Input } from '@/shared/ui/input';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

const initialSubjects = [
  // Add your subject data here
  {
    id: 1,
    code: 'CS101',
    name: 'Introduction to Programming',
    type: 'Theory',
    credits: 4,
    weeklyPeriods: 4,
    faculty: 'John Doe',
    status: 'Complete',
  },
  {
    id: 2,
    code: 'CS102',
    name: 'Data Structures',
    type: 'Theory',
    credits: 4,
    weeklyPeriods: 4,
    faculty: 'Jane Smith',
    status: 'Complete',
  },
  {
    id: 3,
    code: 'CS103',
    name: 'Data Structures Lab',
    type: 'Lab',
    credits: 2,
    weeklyPeriods: 3,
    faculty: 'John Doe',
    status: 'Complete',
  },
  {
    id: 4,
    code: 'CS201',
    name: 'Database Management Systems',
    type: 'Theory',
    credits: 4,
    weeklyPeriods: 4,
    faculty: 'Michael Brown',
    status: 'Complete',
  },
  {
    id: 5,
    code: 'CS202',
    name: 'Database Lab',
    type: 'Lab',
    credits: 2,
    weeklyPeriods: 3,
    faculty: 'Michael Brown',
    status: 'Pending',
  },
  {
    id: 6,
    code: 'CS301',
    name: 'Operating Systems',
    type: 'Theory',
    credits: 4,
    weeklyPeriods: 4,
    faculty: 'Sarah Wilson',
    status: 'Complete',
  },
];

const SubjectTable = () => {
  const [search, setSearch] = React.useState('');
  const [subjects] = React.useState(initialSubjects);

  const filteredSubjects = subjects.filter((subject) => {
    const query = search.toLowerCase();

    return (
      !query ||
      subject.name.toLowerCase().includes(query) ||
      subject.code.toLowerCase().includes(query)
    );
  });

  return (
    <div className="overflow-hidden rounded-xl border">
      {/* Toolbar */}
      <div className="flex items-center p-4">
        <div className="relative w-full max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search subjects..."
            className="h-9 border-[#1e1e1e] bg-transparent pl-9 text-xs focus-visible:ring-1 focus-visible:ring-[#6366f1]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-[#1a1a1a] hover:bg-transparent">
              {['Code', 'Subject', 'Type', 'Credits', 'Periods/Wk', 'Faculty', 'Status', ''].map(
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
            {filteredSubjects.map((subject) => (
              <SubjectRow key={subject.id} subject={subject} />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Empty state */}
      {filteredSubjects.length === 0 && (
        <div className="py-16 text-center">
          <p className="mb-1 text-sm text-[#333]">
            {search ? 'No subjects found' : 'No subjects added yet'}
          </p>

          <p className="text-xs text-[#222]">
            {search
              ? `No subjects match "${search}"`
              : 'Add subjects to build your academic schedule'}
          </p>
        </div>
      )}
    </div>
  );
};

export default SubjectTable;
