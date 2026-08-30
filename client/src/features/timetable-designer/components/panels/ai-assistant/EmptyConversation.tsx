const EmptyConversation = () => {
  return (
    <div className="flex h-full min-h-[240px] flex-col items-center justify-center text-center">
      <div className="flex size-11 items-center justify-center rounded-xl border bg-muted/40">
        ✨
      </div>

      <h3 className="mt-3 text-sm font-semibold">How can I help?</h3>

      <p className="mt-1 max-w-[260px] text-xs leading-5 text-muted-foreground">
        Ask me about conflicts, resources, scheduling, or optimizing your
        timetable.
      </p>
    </div>
  );
};

export default EmptyConversation;
