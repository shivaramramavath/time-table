import { useForm } from 'react-hook-form';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';

interface CreateTimetableData {
  title: string;
  description?: string;
}

interface CreateTimetableDialogProps {
  onClose: () => void;
  onCreate: (data: CreateTimetableData) => void;
  isPending: boolean;
}

const CreateTimetableDialog = ({ onClose, onCreate, isPending }: CreateTimetableDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTimetableData>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = (data: CreateTimetableData) => {
    if (isPending) return;

    onCreate({
      title: data.title.trim(),
      description: data.description?.trim() || undefined,
    });
  };

  const handleClose = () => {
    if (isPending) return;

    reset();
    onClose();
  };

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          handleClose();
        }
      }}
    >
      <DialogContent className="max-w-[480px]">
        <DialogHeader className="border-b border-border pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-base">Create New Timetable</DialogTitle>

              <DialogDescription className="mt-1 text-xs">
                Configure and manage an academic timetable
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          {/* Timetable Name */}
          <div className="space-y-1.5">
            <label htmlFor="timetable-title" className="text-xs font-medium text-muted-foreground">
              Timetable Name
            </label>

            <Input
              id="timetable-title"
              placeholder="e.g. CSE 2026-27"
              autoFocus
              disabled={isPending}
              {...register('title', {
                required: 'Timetable name is required',
                validate: (value) => value.trim().length > 0 || 'Timetable name is required',
              })}
            />

            {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label
              htmlFor="timetable-description"
              className="text-xs font-medium text-muted-foreground"
            >
              Description <span className="text-muted-foreground/50">(optional)</span>
            </label>

            <Textarea
              id="timetable-description"
              placeholder="Brief description of this timetable..."
              disabled={isPending}
              rows={3}
              className="resize-none w-full"
              {...register('description',{
               maxLength: 200,
              })}
            />
          </div>

          <DialogFooter className="border-t border-border pt-4">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create Timetable'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTimetableDialog;
