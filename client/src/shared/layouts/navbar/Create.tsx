import { ArrowUpRightIcon } from 'lucide-react';

import { CraftButton, CraftButtonLabel, CraftButtonIcon } from '@/shared/ui/craft-button';

import { useTimetableMutation } from '@/features/timetables/hooks/timetable.query';
import { navigationService } from '@/shared/services/navigation.service';

const Create = () => {
  const { mutateAsync: createTimetable, isPending } = useTimetableMutation.useCreateTimetable();

  const handleCreate = async () => {
    try {
      const timetable = await createTimetable(null);

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
    <CraftButton size="default" onClick={handleCreate} disabled={isPending}>
      <CraftButtonLabel>{isPending ? 'Creating...' : 'Create'}</CraftButtonLabel>

      <CraftButtonIcon>
        <ArrowUpRightIcon className="size-3 stroke-2 transition-transform duration-500 group-hover:rotate-45" />
      </CraftButtonIcon>
    </CraftButton>
  );
};

export default Create;
