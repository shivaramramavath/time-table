import { useState } from 'react';
import { Archive, Calendar, ChevronRight, Clock, Copy, MoreHorizontal, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import type { Timetable } from '../types/timetable.types';
import { useTimetableMutation } from '../hooks/timetable.query';
import DeleteDialog from './DeleteDialog';

interface TimetableCardProps {
  timetable: Timetable;
}

const TimetableCard = ({ timetable }: TimetableCardProps) => {
  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { mutate: deleteTimetable, isPending: isDeleting } =
    useTimetableMutation.useDeleteTimetable();

  const modifiedAgo = formatDistanceToNow(new Date(timetable.createdAt), {
    addSuffix: true,
  });

  /**
   * Open timetable based on its current stage.
   */
  const handleOpen = () => {
    switch (timetable.stage) {
      case 'incomplete':
        navigate(`/timetables/designer?timetableId=${timetable._id}`);
        break;

      case 'complete':
        navigate(`/timetables/${timetable._id}/view`);
        break;

      default:
        navigate(`/timetables/${timetable._id}`);
    }
  };

  /**
   * Delete timetable.
   */
  const handleDelete = () => {
    deleteTimetable(
      {
        timetableId: timetable._id,
      },
      {
        onSuccess: () => {
          setConfirmDelete(false);
        },
      },
    );
  };

  /**
   * Prevent card click when interacting with menu.
   */
  const handleMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setMenu((prev) => !prev);
  };

  const handleDuplicate = (event: React.MouseEvent) => {
    event.stopPropagation();

    setMenu(false);

    // TODO: Add duplicate mutation here.
    console.log('Duplicate timetable:', timetable._id);
  };

  const handleArchive = (event: React.MouseEvent) => {
    event.stopPropagation();

    setMenu(false);

    // TODO: Add archive mutation here.
    console.log('Archive timetable:', timetable._id);
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    setMenu(false);
    setConfirmDelete(true);
  };

  return (
    <>
      <article
        onClick={handleOpen}
        className="group relative flex cursor-pointer flex-col gap-3 overflow-hidden rounded-xl border border-border/50 bg-surface-muted/5 p-5 backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-lg"
      >
        {/* Subtle background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 top-0 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl transition-all duration-300 group-hover:bg-blue-500/15"
        />

        {/* Header */}
        <div className="relative flex items-start justify-between">
          <div className="flex min-w-0 items-center gap-2.5">
            {/* Icon */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-surface-muted/10 transition-colors group-hover:bg-surface-muted/20">
              <Calendar size={14} className="text-blue-400" />
            </div>

            {/* Title */}
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold">{timetable.title}</h3>

              <p className="mt-0.5 text-xs text-muted-foreground">
                {timetable.stage === 'incomplete' ? 'Work in progress' : 'Completed timetable'}
              </p>
            </div>
          </div>

          {/* More menu */}
          <div className="relative">
            <button
              type="button"
              onClick={handleMenuClick}
              aria-label="Timetable options"
              aria-expanded={menu}
              className="rounded-md p-1.5 opacity-0 transition-colors group-hover:opacity-100 hover:bg-surface-muted/20"
            >
              <MoreHorizontal size={14} className="text-muted-foreground" />
            </button>

            {menu && (
              <div
                className="absolute right-0 top-8 z-20 w-44 overflow-hidden rounded-lg border border-border bg-popover py-1 shadow-xl"
                onClick={(event) => event.stopPropagation()}
                onMouseLeave={() => setMenu(false)}
              >
                {/* Duplicate */}
                <button
                  type="button"
                  onClick={handleDuplicate}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Copy size={13} />
                  <span>Duplicate</span>
                </button>

                {/* Archive */}
                <button
                  type="button"
                  onClick={handleArchive}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Archive size={13} />
                  <span>Archive</span>
                </button>

                <div className="my-1 border-t border-border" />

                {/* Delete */}
                <button
                  type="button"
                  onClick={handleDeleteClick}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-destructive transition-colors hover:bg-destructive/10"
                >
                  <Trash2 size={13} />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {timetable.description || 'No description provided.'}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock size={11} />
            <span>{modifiedAgo.replace('about ', '')}</span>
          </div>

          {/* Stage */}
          <span
            className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${
              timetable.stage === 'incomplete'
                ? 'border-amber-500/20 bg-amber-500/10 text-amber-400'
                : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
            }`}
          >
            {timetable.stage === 'incomplete' ? 'Draft' : 'Complete'}
          </span>
        </div>

        {/* Open / Continue */}
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleOpen();
          }}
          className="group/btn flex w-full items-center justify-center gap-1.5 rounded-lg border border-border/50 bg-surface-muted/10 py-2 text-xs font-medium text-muted-foreground transition-all hover:bg-surface-muted/20 hover:text-foreground"
        >
          {timetable.stage === 'incomplete' ? 'Continue' : 'Open'}

          <ChevronRight
            size={12}
            className="transition-transform group-hover/btn:translate-x-0.5"
          />
        </button>
      </article>

      {/* Delete confirmation */}
      {confirmDelete && (
        <DeleteDialog
          timetable={timetable}
          isDeleting={isDeleting}
          onClose={() => setConfirmDelete(false)}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default TimetableCard;
