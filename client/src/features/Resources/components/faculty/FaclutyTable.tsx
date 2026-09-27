import { Users } from 'lucide-react';
import FacultyRow from './FacultyRow';

import { useFaculty } from '../../hooks/useFaculty';

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import ErrorComponent from '@/shared/components/ErrorComponent';
import LoadingComponent from '@/shared/components/LoadingComponent';

type props = {
  search: string;
};

const FacultyTable = ({ search }: props) => {
  const { data: faculties = [], isLoading, isError, error, refetch } = useFaculty(search);

  if (isLoading) {
    return (
      <LoadingComponent
        message="Loading faculties"
        description="Please wait while we fetch the faculty information."
      />
    );
  }

  if (isError) {
    return (
      <ErrorComponent
        error={error instanceof Error ? error.message : 'Failed to load faculties.'}
        onRetry={() => refetch()}
      />
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
