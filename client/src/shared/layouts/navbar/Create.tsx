import { useState } from 'react';
import { ArrowUpRightIcon, X } from 'lucide-react';

import { CraftButton, CraftButtonLabel, CraftButtonIcon } from '@/shared/ui/craft-button';

import { useTimetableMutation } from '@/features/timetables/hooks/timetable.query';
import { navigationService } from '@/shared/services/navigation.service';

interface CreateTimetableDialogProps {
  onClose: () => void;
  onCreate: (data: {
    title: string;
    description?: string;
  }) => void;
  isPending: boolean;
}

const CreateTimetableDialog = ({ onClose, onCreate, isPending }: CreateTimetableDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || isPending) return;

    onCreate({
      title: title.trim(),
      description: description.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-timetable-title"
        className="fixed top-1/2 w-full max-w-[480px] animate-slide-in-up rounded-xl border border-border bg-background shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 pb-4 pt-6">
          <div>
            <h2 id="create-timetable-title" className="text-base font-semibold">
              Create New Timetable
            </h2>

            <p className="mt-0.5 text-xs text-muted-foreground">
              Configure and manage an academic timetable
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            aria-label="Close dialog"
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4 px-6 py-5">
          {/* Timetable Name */}
          <div>
            <label
              htmlFor="timetable-title"
              className="mb-1.5 block text-xs font-medium text-muted-foreground"
            >
              Timetable Name
            </label>

            <input
              id="timetable-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. CSE 2026-27"
              autoFocus
              disabled={isPending}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-1.5 block text-xs font-medium text-muted-foreground"
            >
              Description <span className="text-muted-foreground/50">(optional)</span>
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Brief description of this timetable..."
              disabled={isPending}
              rows={3}
              className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-6 pb-6">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="flex-1 rounded-lg border border-border bg-muted/30 px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!title.trim() || isPending}
            className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isPending ? 'Creating...' : 'Create Timetable'}
          </button>
        </div>
      </div>
    </div>
  );
};

const Create = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutateAsync: createTimetable, isPending } = useTimetableMutation.useCreateTimetable();

  const handleCreate = async (data: {
    title: string;
    department: string;
    academicYear: string;
    description?: string;
  }) => {
    try {
      const timetable = await createTimetable(data);

      setIsDialogOpen(false);

      if (timetable.stage === 'incomplete') {
        navigationService.navigate(`/timetables/designer?timetableId=${timetable._id}`);

        return;
      }

      navigationService.navigate(`/timetables/${timetable._id}`);
    } catch (error) {
      console.error('Failed to create timetable:', error);
    }
  };

  return (
    <>
      <CraftButton size="default" onClick={() => setIsDialogOpen(true)} disabled={isPending}>
        <CraftButtonLabel>Create</CraftButtonLabel>

        <CraftButtonIcon>
          <ArrowUpRightIcon className="size-3 stroke-2 transition-transform duration-500 group-hover:rotate-45" />
        </CraftButtonIcon>
      </CraftButton>

      {isDialogOpen && (
        <CreateTimetableDialog
          onClose={() => {
            if (!isPending) {
              setIsDialogOpen(false);
            }
          }}
          onCreate={handleCreate}
          isPending={isPending}
        />
      )}
    </>
  );
};

export default Create;
