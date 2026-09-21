import { Sparkles } from 'lucide-react';

const TemplateHeader = () => {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight">Templates</h1>

            <Sparkles className="size-4 text-primary" />
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Reusable timetable configurations for faster scheduling.
          </p>
        </div>
      </div>
    </header>
  );
};

export default TemplateHeader;
