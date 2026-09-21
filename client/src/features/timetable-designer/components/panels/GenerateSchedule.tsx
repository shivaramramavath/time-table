import { memo } from 'react';

import { Button } from '@/shared/ui/button';

import useValidateGraph from '../../hooks/useValidateGraph';
import { toast } from 'sonner';
import { timetableSocket } from '../../socket/timetable.socket';
import { useDesignerStore } from '../../store/designer.store';
import { navigationService } from '@/shared/services/navigation.service';

const GenerateSchedule = () => {
  const { validateGraph } = useValidateGraph();
  const timetableId = useDesignerStore((state) => state.timetableId);

  const handleGenerate = () => {
    const result = validateGraph();

    if (!result.valid) {
      toast.error(result.message);
      return;
    }

    timetableSocket.generate(timetableId);

    toast.success('Generate schedule');

    navigationService.navigate(`/timetables`);
  };

  return (
    <Button
      onClick={handleGenerate}
      className="from-primary via-primary/60 to-primary bg-transparent bg-gradient-to-r [background-size:200%_auto] hover:bg-transparent hover:bg-[99%_center]"
    >
      Generate Schedule
    </Button>
  );
};

export default memo(GenerateSchedule);
