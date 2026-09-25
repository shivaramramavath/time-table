import { Edit2, Trash2 } from 'lucide-react';

import type { Subject } from '../../data/types';

import { Button } from '@/shared/ui/button';
import { TableCell, TableRow } from '@/shared/ui/table';

type SubjectRowProps = {
  subject: Subject;
  onEdit?: (subject: Subject) => void;
  onDelete?: (subject: Subject) => void;
};

const SubjectRow = ({ subject, onEdit, onDelete }: SubjectRowProps) => {
  const handleEdit = () => {
    onEdit?.(subject);
  };

  const handleDelete = () => {
    onDelete?.(subject);
  };

  const typeClass =
    subject.type === 'Lab'
      ? 'border-[#f9731630] bg-[#f9731615] text-[#f97316]'
      : 'border-[#1e1e1e] bg-[#161616] text-[#a0a0a0]';

  const statusClass =
    subject.status === 'Complete'
      ? 'border-[#22c55e30] bg-[#22c55e15] text-[#22c55e]'
      : 'border-[#f59e0b30] bg-[#f59e0b15] text-[#f59e0b]';

  return (
    <TableRow className="group/row ">
      {/* Code */}
      <TableCell className="px-4 py-3">
        <span className="font-mono text-xs text-[#a5b4fc]">{subject.code}</span>
      </TableCell>

      {/* Subject */}
      <TableCell className="px-4 py-3">
        <span className="text-xs font-medium">{subject.name}</span>
      </TableCell>

      {/* Type */}
      <TableCell className="px-4 py-3">
        <span className={`rounded-md border px-2 py-0.5 text-[10px] ${typeClass}`}>
          {subject.type}
        </span>
      </TableCell>

      {/* Credits */}
      <TableCell className="px-4 py-3 text-center">
        <span className="text-xs text-[#666]">{subject.credits}</span>
      </TableCell>

      {/* Periods / Week */}
      <TableCell className="px-4 py-3 text-center">
        <span className="text-xs text-[#666]">{subject.weeklyPeriods}</span>
      </TableCell>

      {/* Status */}
      <TableCell className="px-4 py-3">
        <span className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${statusClass}`}>
          {subject.status}
        </span>
      </TableCell>

      {/* Actions */}
      <TableCell className="px-4 py-3">
        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover/row:opacity-100">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleEdit}
            className="h-7 w-7 rounded-md text-[#555] hover:bg-[#1e1e1e] hover:text-white"
          >
            <Edit2 size={12} />

            <span className="sr-only">Edit {subject.name}</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="h-7 w-7 rounded-md text-[#555] hover:bg-[#ef444415] hover:text-[#ef4444]"
          >
            <Trash2 size={12} />

            <span className="sr-only">Delete {subject.name}</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default SubjectRow;
