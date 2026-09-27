import { Users } from 'lucide-react';
import FacultyRow from './FacultyRow';

import { useFaculty } from '../../hooks/useFaculty';

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

type props = {
  search: string;
};

const FacultyTable = ({ search }: props) => {
  const { data: faculties = [], isLoading, isError } = useFaculty(search);

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-xl border">
        <div className="py-16 text-center">
          <p className="text-sm text-muted-foreground">Loading faculty...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="overflow-hidden rounded-xl border">
        <div className="py-16 text-center">
          <p className="mb-1 text-sm text-[#333]">Failed to load faculty</p>

          <p className="text-xs text-[#222]">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border">
        {faculties.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#1a1a1a] hover:bg-transparent">
                  {['Faculty', 'Employee ID', 'Department', 'Subjects', 'Status'].map((heading) => (
                    <TableHead
                      key={heading}
                      className="h-auto px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#444]"
                    >
                      {heading}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody className="h-30 overflow-y-auto">
                {faculties.map((faculty) => (
                  <FacultyRow key={faculty.id} faculty={faculty} />
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
    </>
  );
};

export default FacultyTable;
