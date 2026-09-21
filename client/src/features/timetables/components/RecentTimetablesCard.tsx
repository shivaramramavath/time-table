import { ArrowRight, CalendarDays } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import type { Timetable } from '../types/timetable.types';

interface RecentTimetableCardProps {
  timetable: Timetable;
}

const RecentTimetableCard = ({ timetable }: RecentTimetableCardProps) => {
  const navigate = useNavigate();

  const updatedAgo = formatDistanceToNow(new Date(timetable.updatedAt), {
    addSuffix: true,
  });

  const handleOpen = () => {
    if (timetable.stage === 'incomplete') {
      navigate(`/timetables/designer?timetableId=${timetable._id}`);
      return;
    }

    navigate(`/timetables/${timetable._id}`);
  };

  return (
    <article
      onClick={handleOpen}
      className="group w-64 cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-surface-muted/5 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Header */}
      <div className="flex items-start gap-2">
        <div className="shrink-0 rounded-xl bg-surface-muted/10 p-2 transition group-hover:bg-surface-muted/20">
          <CalendarDays size={18} />
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold">{timetable.title}</h2>

          <p className="mt-1 line-clamp-1 min-h-8 text-xs leading-4 text-muted-foreground">
            {timetable.description || 'No description'}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>{updatedAgo.replace('about ', '')}</span>

        <span className="flex items-center gap-1 transition-all group-hover:gap-2">
          {timetable.stage === 'incomplete' ? 'Continue' : 'Open'}

          <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
};

export default RecentTimetableCard;
