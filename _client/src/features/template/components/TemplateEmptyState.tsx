import { FileStack, Plus } from 'lucide-react';

import { Button } from '@/shared/ui/button';

const TemplateEmptyState = () => {
  return (
    <div
      className="
        flex min-h-[400px]
        flex-col items-center
        justify-center
        rounded-xl border
        border-dashed
      "
    >
      <div
        className="
          flex size-12 items-center
          justify-center rounded-xl
          bg-muted
        "
      >
        <FileStack className="size-5 text-muted-foreground" />
      </div>

      <h3 className="mt-4 text-sm font-semibold">No templates yet</h3>

      <p className="mt-1 max-w-sm text-center text-xs text-muted-foreground">
        Save your timetable configurations as templates and reuse them whenever you create a new
        designer.
      </p>

      <Button size="sm" className="mt-4 gap-2">
        <Plus className="size-4" />
        Create Template
      </Button>
    </div>
  );
};

export default TemplateEmptyState;
