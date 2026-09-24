import { useState } from 'react';
import { ArrowUpRightIcon } from 'lucide-react';

import { CraftButton, CraftButtonLabel, CraftButtonIcon } from '@/shared/ui/craft-button';

import { useTimetableMutation } from '@/features/timetables/hooks/timetable.query';
import { navigationService } from '@/shared/services/navigation.service';
import CreateTimetableDialog from './CreateTimetableDialog';

interface CreateTimetableData {
  title: string;
  description?: string;
}

const Create = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutateAsync: createTimetable, isPending } = useTimetableMutation.useCreateTimetable();

  const handleCreate = async (data: CreateTimetableData) => {
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
