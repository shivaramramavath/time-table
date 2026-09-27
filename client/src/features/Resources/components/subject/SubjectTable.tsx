import { BookOpen } from 'lucide-react';

import SubjectRow from './SubjectRow';

import { useSubject } from '../../hooks/useSubject';

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import LoadingComponent from '@/shared/components/LoadingComponent';
import ErrorComponent from '@/shared/components/ErrorComponent';

type Props = {
  search: string;
};

const SubjectTable = ({ search }: Props) => {
  const { data: subjects = [], isLoading, isError, error, refetch } = useSubject(search);

  if (isLoading) {
    return (
      <LoadingComponent
        message="Loading subjects"
        description="Please wait while we fetch the subject information."
      />
    );
  }

  if (isError) {
    return (
      <ErrorComponent
        error={error instanceof Error ? error.message : 'Failed to load subjects.'}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      {subjects.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-[#1a1a1a] hover:bg-transparent">
                {[
                  'Code',
                  'Subject',
                  'Type',
                  'Credits',
                  'Periods/Wk',
                  'Department',
                  'Semester',
                  'Status',
                ].map((heading) => (
                  <TableHead
                    key={heading}
                    className="h-auto px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#444]"
                  >
                    {heading}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {subjects.map((subject) => (
                <SubjectRow key={subject.id} subject={subject} />
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="py-16 text-center">
          <BookOpen size={28} className="mx-auto mb-3 text-[#222]" />

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
