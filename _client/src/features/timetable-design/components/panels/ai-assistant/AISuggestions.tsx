import { memo } from 'react';
import { AlertTriangle, CalendarCheck, Search, Sparkles } from 'lucide-react';

interface Props {
  onSelect?: (prompt: string) => void;
}

const suggestions = [
  {
    label: 'Find conflicts',
    icon: AlertTriangle,
    prompt: 'Find all faculty, room, and section conflicts.',
  },
  {
    label: 'Optimize timetable',
    icon: Sparkles,
    prompt: 'Analyze the timetable and suggest optimizations.',
  },
  {
    label: 'Check resources',
    icon: Search,
    prompt: 'Check whether all required resources are available.',
  },
  {
    label: 'Validate schedule',
    icon: CalendarCheck,
    prompt: 'Validate the current timetable configuration.',
  },
];

const AISuggestions = ({ onSelect }: Props) => {
  return (
    <div className="absolute inset-x-0 bottom-10 px-3 py-2">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide scrollbar">
        {suggestions.map(({ label, icon: Icon, prompt }) => (
          <button
            key={label}
            type="button"
            onClick={() => onSelect?.(prompt)}
            className="
                flex shrink-0 bg-background items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[10px] text-muted-foreground transition-colors
              "
          >
            <Icon className="size-3" />

            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default memo(AISuggestions);
