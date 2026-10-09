import { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';

import SubjectModal from './SubjectModal';

import type { Subject } from '../../api/SubjectApi';
import { useDeleteSubject } from '../../hooks/useSubject';

import { Button } from '@/shared/ui/button';
import { TableCell, TableRow } from '@/shared/ui/table';

type SubjectRowProps = {
  subject: Subject;
  onEdit?: (subject: Subject) => void;
  onDelete?: (subject: Subject) => void;
};

const SubjectRow = ({ subject, onEdit, onDelete }: SubjectRowProps) => {
  const [editSubject, setEditSubject] = useState<Subject | null>(null);

  const deleteSubject = useDeleteSubject();

  const handleEdit = () => {
    setEditSubject(subject);
    onEdit?.(subject);
  };

  const handleDelete = () => {
    deleteSubject.mutate(subject.id, {
      onSuccess: () => {
        onDelete?.(subject);
      },
    });
  };

  const handleSave = (updatedSubject: Subject) => {
    setEditSubject(null);
    onEdit?.(updatedSubject);
  };

  const typeClass =
    subject.type === 'lab'
      ? 'border-[#f9731630] bg-[#f9731615] text-[#f97316]'
      : subject.type === 'tutorial'
        ? 'border-[#a855f730] bg-[#a855f715] text-[#a855f7]'
        : 'border-[#1e1e1e] bg-[#161616] text-[#a0a0a0]';

  const statusClass =
    subject.status === 'active'
      ? 'border-[#22c55e30] bg-[#22c55e15] text-[#22c55e]'
      : 'border-[#1e1e1e] bg-[#161616] text-[#555]';

  return (
    <>
      <TableRow className="group/row">
        <TableCell className="px-4 py-3">
          <span className="font-mono text-xs text-[#a5b4fc]">{subject.code}</span>
        </TableCell>

        <TableCell className="px-4 py-3">
          <div className="min-w-0">
            <p className="max-w-[220px] truncate text-xs font-medium">{subject.name}</p>

            <p className="mt-0.5 text-[10px] text-[#555]">
              {subject.department} · Sem {subject.semester}
            </p>
          </div>
        </TableCell>

        <TableCell className="px-4 py-3">
          <span
            className={`rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase ${typeClass}`}
          >
            {subject.type}
          </span>
        </TableCell>

        <TableCell className="px-4 py-3 text-center">
          <span className="text-xs text-[#666]">{subject.credits}</span>
        </TableCell>

        <TableCell className="px-4 py-3 text-center">
          <span className="text-xs text-[#666]">{subject.weeklyPeriods}</span>
        </TableCell>

        <TableCell className="px-4 py-3">
          <span className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${statusClass}`}>
            {subject.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </TableCell>

        <TableCell className="px-4 py-3">
          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover/row:opacity-100">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={deleteSubject.isPending}
              onClick={handleEdit}
              className="h-7 w-7 rounded-md text-[#555] hover:bg-[#1e1e1e] hover:text-white"
            >
              <Edit2 size={12} />

              <span className="sr-only">Edit {subject.name}</span>
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={deleteSubject.isPending}
              onClick={handleDelete}
              className="h-7 w-7 rounded-md text-[#555] hover:bg-[#ef444415] hover:text-[#ef4444]"
            >
              <Trash2 size={12} />

              <span className="sr-only">Delete {subject.name}</span>
            </Button>
          </div>
        </TableCell>
      </TableRow>

      <SubjectModal
        open={Boolean(editSubject)}
        subject={editSubject ?? undefined}
        onClose={() => setEditSubject(null)}
        onSave={handleSave}
      />
    </>
  );
};

export default SubjectRow;
