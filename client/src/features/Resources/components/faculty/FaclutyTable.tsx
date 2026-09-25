import React from 'react';
import { Download, Plus, Search, Upload, Users } from 'lucide-react';

import FacultyRow from './FacultyRow';
import type { Faculty } from '../../data/types';

import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

const initialFaculties: Faculty[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    employeeId: 'EMP001',
    department: 'Computer Science',
    subjects: ['React', 'JavaScript'],
    status: 'active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    employeeId: 'EMP002',
    department: 'Mathematics',
    subjects: ['Calculus', 'Algebra'],
    status: 'active',
  },
];

const FacultyTable = () => {
  const [search, setSearch] = React.useState('');
  const [faculties, setFaculties] = React.useState<Faculty[]>(initialFaculties);

  const filteredFaculties = faculties.filter((faculty) => {
    const query = search.toLowerCase();

    return (
      faculty.name.toLowerCase().includes(query) ||
      faculty.employeeId.toLowerCase().includes(query) ||
      faculty.department.toLowerCase().includes(query)
    );
  });

  const handleAddFaculty = () => {
    console.log('Add faculty');
  };

  const handleImport = () => {
    console.log('Import faculty');
  };

  const handleExport = () => {
    console.log('Export faculty');
  };

  const handleDeleteFaculty = (faculty: Faculty) => {
    setFaculties((current) => current.filter((item) => item.id !== faculty.id));
  };

  const handleSaveFaculty = (updatedFaculty: Faculty) => {
    setFaculties((current) =>
      current.map((faculty) => (faculty.id === updatedFaculty.id ? updatedFaculty : faculty)),
    );
  };

  return (
    <div className="overflow-hidden rounded-xl border">
      {/* Toolbar */}
      <div className="flex items-center gap-3 p-4">
        {/* Search */}
        <div className="relative w-full max-w-xs">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search faculty..."
            className="h-9 border-[#1e1e1e] bg-transparent pl-9 text-xs focus-visible:ring-1 focus-visible:ring-[#6366f1]"
          />
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleImport}
            className="h-9 gap-1.5 border-[#1e1e1e] text-xs hover:border-[#2a2a2a]"
          >
            <Upload size={13} />
            Import
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="h-9 gap-1.5 border-[#1e1e1e] text-xs hover:border-[#2a2a2a]"
          >
            <Download size={13} />
            Export
          </Button>

          <Button
            size="sm"
            onClick={handleAddFaculty}
            className="h-9 gap-1.5 bg-[#6366f1] text-xs text-white hover:bg-[#5558e8]"
          >
            <Plus size={14} />
            Add Faculty
          </Button>
        </div>
      </div>

      {/* Table */}
      {filteredFaculties.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-[#1a1a1a] hover:bg-transparent">
                {['Faculty', 'Employee ID', 'Department', 'Subjects', 'Status', ''].map(
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
              {filteredFaculties.map((faculty) => (
                <FacultyRow
                  key={faculty.id}
                  faculty={faculty}
                  onDelete={handleDeleteFaculty}
                  onSave={handleSaveFaculty}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="py-16 text-center">
          <Users size={28} className="mx-auto mb-3 text-[#222]" />

          <p className="mb-1 text-sm text-[#333]">
            {search ? 'No faculty found' : 'No faculty added yet'}
          </p>

          <p className="text-xs text-[#222]">
            {search
              ? `No faculty matches "${search}"`
              : 'Add faculty to assign instructors to subjects'}
          </p>
        </div>
      )}
    </div>
  );
};

export default FacultyTable;
