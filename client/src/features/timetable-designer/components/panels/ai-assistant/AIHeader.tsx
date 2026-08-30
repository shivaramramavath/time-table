import { Bot, Sparkles } from "lucide-react";

const AIHeader = () => {
  return (
    <header className="border-b border-border px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border bg-muted/50">
          <Bot className="size-4" />
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="text-sm font-semibold">Timetable AI</h2>

            <Sparkles className="size-3.5 text-primary" />
          </div>

          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" />

            <p className="text-[10px] text-muted-foreground">Ready to help</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AIHeader;
