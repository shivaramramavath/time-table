import { Trash2 } from 'lucide-react';
import type { Timetable } from '../types/timetable.types';

interface DeleteDialogProps {
  timetable: Timetable;
  isDeleting: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteDialog = ({ timetable, isDeleting, onClose, onDelete }: DeleteDialogProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        className="w-full max-w-sm rounded-xl border border-border bg-background p-5 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4">
          <h2 id="delete-dialog-title" className="text-sm font-semibold">
            Delete timetable?
          </h2>

          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Are you sure you want to delete{' '}
            <span className="font-medium text-foreground">"{timetable.title}"</span>? This action
            cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 rounded-lg bg-destructive px-3 py-2 text-xs font-medium text-destructive-foreground transition-colors hover:bg-destructive/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={13} />

            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
