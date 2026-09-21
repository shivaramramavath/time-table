import debounce from 'lodash.debounce';
import { memo, useEffect, useMemo, useState } from 'react';

import { timetableService } from '../../services/timetable.service';
import { useDesignerStore } from '../../store/designer.store';

const TimetableTitle = () => {
  const timetableId = useDesignerStore((state) => state.timetableId);

  const [title, setTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [originalTitle, setOriginalTitle] = useState('');

  const debouncedUpdate = useMemo(
    () =>
      debounce(async (id: string, value: string) => {
        const trimmedTitle = value.trim();

        if (!id || !trimmedTitle) return;

        await timetableService.update(id, {
          title: trimmedTitle,
        });
      }, 500),
    [],
  );

  // Cleanup debounce
  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  // Load timetable title
  useEffect(() => {
    if (!timetableId) return;

    let active = true;

    const loadTitle = async () => {
      try {
        const timetable = await timetableService.get(timetableId);

        if (!active) return;

        const value = timetable.title?.trim() || 'Untitled Timetable';

        setTitle(value);
        setOriginalTitle(value);
      } catch (error) {
        console.error('Failed to load timetable title:', error);
      }
    };

    loadTitle();

    return () => {
      active = false;
    };
  }, [timetableId]);

  const handleChange = (value: string) => {
    setTitle(value);

    if (!timetableId) return;

    debouncedUpdate(timetableId, value);
  };

  const handleStartEditing = () => {
    setOriginalTitle(title);
    setIsEditing(true);
  };

  const handleBlur = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setTitle(originalTitle);
      debouncedUpdate.cancel();
    } else {
      setTitle(trimmedTitle);
      debouncedUpdate.flush();
    }

    setIsEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
      return;
    }

    if (event.key === 'Escape') {
      debouncedUpdate.cancel();

      setTitle(originalTitle);
      setIsEditing(false);
    }
  };

  if (!timetableId) {
    return null;
  }

  return isEditing ? (
    <input
      autoFocus
      value={title}
      onChange={(event) => handleChange(event.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className="
        w-full min-w-45 rounded-md border-none bg-background px-2 text-xl font-semibold outline-none underline underline-offset-4 decoration-primary/50 focus:decoration-primary
      "
    />
  ) : (
    <button
      type="button"
      onClick={handleStartEditing}
      className="
        max-w-45 truncate cursor-text px-2 text-left text-xl font-semibold underline underline-offset-4 decoration-muted-foreground/40 transition-colors hover:decoration-foreground
      "
    >
      {title || 'Untitled'}
    </button>
  );
};

export default memo(TimetableTitle);
