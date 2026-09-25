import { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';

import FacultyModal from './FacultyModal';

import { Button } from '@/shared/ui/button';
import { TableCell, TableRow } from '@/shared/ui/table';

import { SubjectChip } from '../Resources';
import type { Faculty } from '../../api/FacultyApi';

type FacultyRowProps = {
  faculty: Faculty;
  onDelete?: (faculty: Faculty) => void;
  onSave?: (faculty: Faculty) => void;
  isDeleting?: boolean;
  isSaving?: boolean;
};

const FacultyRow = ({
  faculty,
  onDelete,
  onSave,
  isDeleting = false,
  isSaving = false,
}: FacultyRowProps) => {
  const [editFaculty, setEditFaculty] = useState<Faculty | null>(null);

  const handleEdit = () => {
    if (isDeleting || isSaving) {
      return;
    }

    setEditFaculty(faculty);
  };

  const handleDelete = () => {
    if (isDeleting || isSaving) {
      return;
    }

    onDelete?.(faculty);
  };

  const handleSave = (updatedFaculty: Faculty) => {
    onSave?.(updatedFaculty);
    setEditFaculty(null);
  };

  const initials = faculty.name
    .split(' ')
    .filter(Boolean)
    .map((name) => name[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <TableRow className="group/row">
        <TableCell className="px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-[10px] font-bold text-white">
              {initials}
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium">{faculty.name}</p>

              <p className="max-w-[180px] truncate text-[10px] text-[#555]">{faculty.email}</p>
            </div>
          </div>
        </TableCell>

        <TableCell className="px-4 py-3">
          <span className="text-xs text-[#666]">{faculty.employeeId}</span>
        </TableCell>

        <TableCell className="px-4 py-3">
          <span className="block max-w-[120px] truncate text-xs text-[#666]">
            {faculty.department}
          </span>
        </TableCell>

        <TableCell className="px-4 py-3">
          <div className="flex flex-wrap gap-1">
            {faculty.subjectIds.slice(0, 2).map((subjectId) => (
              <SubjectChip key={subjectId} label={subjectId} />
            ))}

            {faculty.subjectIds.length > 2 && (
              <span className="text-[10px] text-[#444]">+{faculty.subjectIds.length - 2}</span>
            )}
          </div>
        </TableCell>

        <TableCell className="px-4 py-3">
          <span
            className={
              faculty.status === 'active'
                ? `
                  rounded-md
                  border border-[#22c55e30]
                  bg-[#22c55e15]
                  px-2 py-0.5
                  text-[10px]
                  font-medium
                  text-[#22c55e]
                `
                : `
                  rounded-md
                  border border-[#1e1e1e]
                  bg-[#161616]
                  px-2 py-0.5
                  text-[10px]
                  font-medium
                  text-[#555]
                `
            }
          >
            {faculty.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </TableCell>

        <TableCell className="px-4 py-3">
          <div
            className="
              flex items-center gap-1
              opacity-0
              transition-opacity
              group-hover/row:opacity-100
            "
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={isDeleting || isSaving}
              onClick={handleEdit}
              className="
                h-7 w-7
                rounded-md
                text-[#555]
                hover:bg-[#1e1e1e]
                hover:text-white
              "
            >
              <Edit2 size={12} />

              <span className="sr-only">Edit {faculty.name}</span>
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={isDeleting || isSaving}
              onClick={handleDelete}
              className="
                h-7 w-7
                rounded-md
                text-[#555]
                hover:bg-[#ef444415]
                hover:text-[#ef4444]
              "
            >
              <Trash2 size={12} />

              <span className="sr-only">Delete {faculty.name}</span>
            </Button>
          </div>
        </TableCell>
      </TableRow>

      <FacultyModal
        open={!!editFaculty}
        faculty={editFaculty ?? undefined}
        onClose={() => setEditFaculty(null)}
        onSave={handleSave}
      />
    </>
  );
};

export default FacultyRow;
