import { useMemo, useState } from 'react';
import { AlertCircle, Check, CheckCircle2, Download, Eye, X } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                                   CONFIG                                   */
/* -------------------------------------------------------------------------- */

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Periods before lunch:
 * 09:00 → period 0
 * 10:00 → period 1
 * 11:00 → period 2
 * 12:00 → period 3
 *
 * Lunch:
 * 13:00 - 14:00
 *
 * Periods after lunch:
 * 14:00 → period 4
 * 15:00 → period 5
 * 16:00 → period 6
 */
const SCHEDULE_ROWS = [
  {
    type: 'period',
    time: '09:00',
    period: 0,
  },
  {
    type: 'period',
    time: '10:00',
    period: 1,
  },
  {
    type: 'period',
    time: '11:00',
    period: 2,
  },
  {
    type: 'period',
    time: '12:00',
    period: 3,
  },
  {
    type: 'lunch',
    time: '13:00',
  },
  {
    type: 'period',
    time: '14:00',
    period: 4,
  },
  {
    type: 'period',
    time: '15:00',
    period: 5,
  },
  {
    type: 'period',
    time: '16:00',
    period: 6,
  },
] as const;

/**
 * Used when displaying a class time inside the details modal.
 */
const TIMES = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'];

/* -------------------------------------------------------------------------- */
/*                               MOCK SCHEDULE                                */
/* -------------------------------------------------------------------------- */

export const mockScheduleBlocks = [
  {
    id: 'b1',
    subject: 'DBMS',
    faculty: 'Prof. Ravi Kumar',
    room: 'Room 101',
    section: 'CSE-A',
    day: 'Monday',
    period: 0,
    color: '#6366f1',
  },
  {
    id: 'b2',
    subject: 'OS',
    faculty: 'Prof. Ravi Kumar',
    room: 'Room 101',
    section: 'CSE-A',
    day: 'Monday',
    period: 2,
    color: '#8b5cf6',
  },
  {
    id: 'b3',
    subject: 'ML',
    faculty: 'Prof. Venkat Rao',
    room: 'Room 102',
    section: 'CSE-A',
    day: 'Monday',
    period: 4,
    color: '#06b6d4',
  },
  {
    id: 'b4',
    subject: 'DBMS',
    faculty: 'Prof. Ravi Kumar',
    room: 'Room 101',
    section: 'CSE-A',
    day: 'Tuesday',
    period: 1,
    color: '#6366f1',
  },
  {
    id: 'b5',
    subject: 'CN',
    faculty: 'Prof. Ravi Kumar',
    room: 'Room 102',
    section: 'CSE-A',
    day: 'Tuesday',
    period: 3,
    color: '#ec4899',
  },
  {
    id: 'b6',
    subject: 'DBMS Lab',
    faculty: 'Prof. Venkat Rao',
    room: 'CS Lab 1',
    section: 'CSE-A',
    day: 'Wednesday',
    period: 0,
    color: '#f97316',
  },
  {
    id: 'b7',
    subject: 'ML',
    faculty: 'Prof. Venkat Rao',
    room: 'Room 102',
    section: 'CSE-A',
    day: 'Wednesday',
    period: 3,
    color: '#06b6d4',
  },
  {
    id: 'b8',
    subject: 'OS',
    faculty: 'Prof. Ravi Kumar',
    room: 'Room 101',
    section: 'CSE-A',
    day: 'Thursday',
    period: 0,
    color: '#8b5cf6',
  },
  {
    id: 'b9',
    subject: 'SE',
    faculty: 'Dr. Shiva Ram Ramavath',
    room: 'Room 102',
    section: 'CSE-A',
    day: 'Thursday',
    period: 2,
    color: '#22c55e',
  },
  {
    id: 'b10',
    subject: 'CN',
    faculty: 'Prof. Ravi Kumar',
    room: 'Room 101',
    section: 'CSE-A',
    day: 'Friday',
    period: 1,
    color: '#ec4899',
  },
  {
    id: 'b11',
    subject: 'SE',
    faculty: 'Dr. Shiva Ram Ramavath',
    room: 'Room 102',
    section: 'CSE-A',
    day: 'Friday',
    period: 3,
    color: '#22c55e',
  },
  {
    id: 'b12',
    subject: 'ML',
    faculty: 'Prof. Venkat Rao',
    room: 'Room 102',
    section: 'CSE-A',
    day: 'Friday',
    period: 5,
    color: '#06b6d4',
  },
];

/* -------------------------------------------------------------------------- */
/*                                  SECTIONS                                  */
/* -------------------------------------------------------------------------- */

type ScheduleBlockType = (typeof mockScheduleBlocks)[number];

/* -------------------------------------------------------------------------- */
/*                              SCHEDULE BLOCK                                */
/* -------------------------------------------------------------------------- */

interface ScheduleBlockProps {
  block: ScheduleBlockType;
  onClick: () => void;
}

function ScheduleBlock({ block, onClick }: ScheduleBlockProps) {
  const facultyName = block.faculty.split(' ').slice(-1)[0];

  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group/block
        absolute
        inset-1
        overflow-hidden
        rounded-lg
        border
        text-left
        transition-all
        duration-200
        hover:-translate-y-px
        hover:shadow-lg
        focus:outline-none
        focus:ring-1
      "
      style={{
        backgroundColor: `${block.color}12`,
        borderColor: `${block.color}35`,
      }}
    >
      <div className="flex h-full flex-col px-2 py-1.5">
        {/* Subject */}
        <div className="flex items-start justify-between gap-1">
          <p
            className="truncate text-[10px] font-semibold leading-tight"
            style={{
              color: block.color,
            }}
          >
            {block.subject}
          </p>

          <Eye
            size={10}
            className="
              shrink-0
              opacity-0
              transition-opacity
              group-hover/block:opacity-70
            "
            style={{
              color: block.color,
            }}
          />
        </div>

        {/* Faculty */}
        <p className="mt-1 truncate text-[9px] text-muted-foreground">{facultyName}</p>

        {/* Room */}
        <p className="mt-auto truncate text-[9px] text-muted-foreground/60">{block.room}</p>
      </div>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*                                STATUS BADGE                                */
/* -------------------------------------------------------------------------- */

function StatusBadge({ published }: { published: boolean }) {
  return published ? (
    <span
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        border-emerald-500/20
        bg-emerald-500/10
        px-2
        py-0.5
        text-[10px]
        font-medium
        text-emerald-400
      "
    >
      <CheckCircle2 size={10} />
      Published
    </span>
  ) : (
    <span
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        border-blue-500/20
        bg-blue-500/10
        px-2
        py-0.5
        text-[10px]
        font-medium
        text-blue-400
      "
    >
      <span className="size-1.5 rounded-full bg-blue-400" />
      Generated
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  SCHEDULE                                  */
/* -------------------------------------------------------------------------- */

export default function Schedule() {
  const [showConflicts, setShowConflicts] = useState(false);

  const [showPublish, setShowPublish] = useState(false);

  const [published, setPublished] = useState(false);

  const [selectedSection, setSelectedSection] = useState('CSE-A');

  const [selectedBlock, setSelectedBlock] = useState<ScheduleBlockType | null>(null);

  /* ------------------------------------------------------------------------ */
  /*                           BLOCKS BY CELL                                 */
  /* ------------------------------------------------------------------------ */

  const blocksByCell = useMemo(() => {
    const result: Record<string, ScheduleBlockType | undefined> = {};

    mockScheduleBlocks
      .filter((block) => block.section === selectedSection)
      .forEach((block) => {
        result[`${block.day}-${block.period}`] = block;
      });

    return result;
  }, [selectedSection]);

  /* ------------------------------------------------------------------------ */
  /*                                WARNINGS                                  */
  /* ------------------------------------------------------------------------ */

  const warnings = [
    {
      id: 1,
      message: 'Faculty workload preference: Prof. Ravi Kumar has 5 consecutive classes on Tuesday',
    },
    {
      id: 2,
      message: 'Soft constraint: CS506 (SE) scheduled in first period — consider moving',
    },
  ];

  /* ------------------------------------------------------------------------ */
  /*                              READINESS                                   */
  /* ------------------------------------------------------------------------ */

  const readinessItems = [
    'Institution',
    'Programs',
    'Academic Years',
    'Sections',
    'Subjects',
    'Faculty',
    'Rooms',
    'Constraints',
  ];

  /* ------------------------------------------------------------------------ */
  /*                                  UI                                      */
  /* ------------------------------------------------------------------------ */

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-background">
      {/* ================================================================== */}
      {/* HEADER                                                             */}
      {/* ================================================================== */}

      <header className="shrink-0 border-b border-border/60 bg-background/80 px-6 pt-5 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4 pb-4">
          {/* Title */}
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <h1 className="text-sm font-semibold tracking-tight">Generated Schedule</h1>

              <StatusBadge published={published} />
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              Review, validate and publish your generated timetable.
            </p>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">
            {/* Warnings */}
            <button
              type="button"
              onClick={() => setShowConflicts((value) => !value)}
              className={`
                inline-flex
                h-8
                items-center
                gap-1.5
                rounded-lg
                border
                px-3
                text-xs
                font-medium
                transition-colors
                ${
                  showConflicts
                    ? 'border-amber-500/30 bg-amber-500/10 text-amber-400'
                    : 'border-border bg-muted/20 text-muted-foreground hover:border-amber-500/20 hover:bg-amber-500/5 hover:text-amber-400'
                }
              `}
            >
              <AlertCircle size={12} />

              <span>2 Warnings</span>
            </button>

            {/* Export */}
            <button
              type="button"
              className="
                inline-flex
                h-8
                items-center
                gap-1.5
                rounded-lg
                border
                border-border
                bg-muted/20
                px-3
                text-xs
                font-medium
                text-muted-foreground
                transition-colors
                hover:bg-muted
                hover:text-foreground
              "
            >
              <Download size={12} />
              Export
            </button>

            {/* Publish */}
            {!published ? (
              <button
                type="button"
                onClick={() => setShowPublish(true)}
                className="
                  inline-flex
                  h-8
                  items-center
                  gap-1.5
                  rounded-lg
                  bg-primary
                  px-3
                  text-xs
                  font-medium
                  text-primary-foreground
                  shadow-sm
                  transition-all
                  hover:bg-primary/90
                  hover:shadow-md
                "
              >
                <CheckCircle2 size={12} />
                Publish
              </button>
            ) : (
              <div
                className="
                  inline-flex
                  h-8
                  items-center
                  gap-1.5
                  rounded-lg
                  border
                  border-emerald-500/20
                  bg-emerald-500/10
                  px-3
                  text-xs
                  font-medium
                  text-emerald-400
                "
              >
                <CheckCircle2 size={12} />
                Published
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ================================================================== */}
      {/* SCHEDULE                                                           */}
      {/* ================================================================== */}

      <main className="min-h-0 flex-1 overflow-auto p-5">
        <div
          className="
            min-w-[900px]
            overflow-hidden
            rounded-xl
            border
            border-border/60
            bg-card/30
          "
        >
          {/* ================================================================ */}
          {/* DAY HEADER                                                       */}
          {/* ================================================================ */}

          <div
            className="
              sticky
              top-0
              z-10
              flex
              border-b
              border-border/60
              bg-card/95
              backdrop-blur-xl
            "
          >
            {/* Time header */}
            <div
              className="
                w-[72px]
                shrink-0
                border-r
                border-border/50
              "
            />

            {/* Days */}
            {DAYS.map((day) => (
              <div
                key={day}
                className="
                  min-w-[128px]
                  flex-1
                  border-r
                  border-border/40
                  px-3
                  py-3
                  text-center
                  last:border-r-0
                "
              >
                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-muted-foreground/60
                  "
                >
                  {day.slice(0, 3)}
                </span>

                <p className="mt-0.5 text-xs font-medium">{day}</p>
              </div>
            ))}
          </div>

          {/* ================================================================ */}
          {/* SCHEDULE ROWS                                                    */}
          {/* ================================================================ */}

          {SCHEDULE_ROWS.map((row) => {
            /* ============================================================ */
            /* LUNCH ROW                                                     */
            /* ============================================================ */

            if (row.type === 'lunch') {
              return (
                <div
                  key="lunch"
                  className="
                    flex
                    border-b
                    border-border/40
                    bg-muted/[0.03]
                  "
                >
                  {/* Lunch time */}
                  <div
                    className="
                      flex
                      w-[72px]
                      shrink-0
                      items-center
                      justify-end
                      border-r
                      border-border/50
                      px-3
                    "
                  >
                    <span
                      className="
                        font-mono
                        text-[10px]
                        text-muted-foreground/50
                      "
                    >
                      13:00
                    </span>
                  </div>

                  {/* ====================================================== */}
                  {/* FULL WIDTH MERGED LUNCH BLOCK                          */}
                  {/* ====================================================== */}

                  <div className="relative h-[76px] min-w-0 flex-1">
                    <div
                      className="
                        absolute
                        inset-1
                        flex
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-amber-500/20
                        bg-amber-500/5
                        transition-colors
                        hover:border-amber-500/30
                        hover:bg-amber-500/[0.08]
                      "
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="
                            size-1.5
                            rounded-full
                            bg-amber-400
                          "
                        />

                        <span
                          className="
                            text-[11px]
                            font-semibold
                            tracking-wide
                            text-amber-400
                          "
                        >
                          LUNCH BREAK
                        </span>

                        <span
                          className="
                            text-[10px]
                            text-muted-foreground/60
                          "
                        >
                          13:00 — 14:00
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            /* ============================================================ */
            /* NORMAL PERIOD ROW                                             */
            /* ============================================================ */

            return (
              <div
                key={`${row.time}-${row.period}`}
                className="
                  flex
                  border-b
                  border-border/40
                  last:border-b-0
                "
              >
                {/* Time */}
                <div
                  className="
                    flex
                    w-[72px]
                    shrink-0
                    items-start
                    justify-end
                    border-r
                    border-border/50
                    px-3
                    pt-3
                  "
                >
                  <span
                    className="
                      font-mono
                      text-[10px]
                      text-muted-foreground/50
                    "
                  >
                    {row.time}
                  </span>
                </div>

                {/* ======================================================== */}
                {/* DAY CELLS                                                  */}
                {/* ======================================================== */}

                {DAYS.map((day) => {
                  const block = blocksByCell[`${day}-${row.period}`];

                  return (
                    <div
                      key={day}
                      className="
                        relative
                        h-[76px]
                        min-w-[128px]
                        flex-1
                        border-r
                        border-border/40
                        bg-background/20
                        last:border-r-0
                      "
                    >
                      {block ? (
                        <ScheduleBlock block={block} onClick={() => setSelectedBlock(block)} />
                      ) : (
                        <div
                          className="
                            absolute
                            inset-0
                            opacity-0
                            transition-opacity
                            hover:bg-muted/20
                          "
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </main>

      {/* ================================================================== */}
      {/* VALIDATION WARNINGS                                                */}
      {/* ================================================================== */}

      {showConflicts && (
        <section
          className="
            shrink-0
            border-t
            border-border/60
            bg-card/40
            px-6
            py-4
            backdrop-blur-xl
          "
        >
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-semibold">Validation Warnings</h2>

              <p className="mt-0.5 text-[10px] text-muted-foreground">
                These warnings are non-blocking.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowConflicts(false)}
              className="
                rounded-md
                p-1
                text-muted-foreground
                transition-colors
                hover:bg-muted
                hover:text-foreground
              "
              aria-label="Close warnings"
            >
              <X size={13} />
            </button>
          </div>

          <div className="grid gap-2 lg:grid-cols-2">
            {warnings.map((warning) => (
              <div
                key={warning.id}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-lg
                  border
                  border-amber-500/15
                  bg-amber-500/5
                  px-3
                  py-2.5
                "
              >
                <div
                  className="
                    flex
                    size-6
                    shrink-0
                    items-center
                    justify-center
                    rounded-md
                    bg-amber-500/10
                  "
                >
                  <AlertCircle size={12} className="text-amber-400" />
                </div>

                <p
                  className="
                    min-w-0
                    flex-1
                    text-[11px]
                    leading-relaxed
                    text-muted-foreground
                  "
                >
                  {warning.message}
                </p>

                <button
                  type="button"
                  className="
                    shrink-0
                    text-[10px]
                    font-medium
                    text-primary
                    hover:underline
                  "
                >
                  Review
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================================================================== */}
      {/* BLOCK DETAILS MODAL                                                */}
      {/* ================================================================== */}

      {selectedBlock && (
        <div
          className="
            fixed
            inset-0
            z-40
            flex
            items-center
            justify-center
            bg-black/50
            p-4
            backdrop-blur-sm
          "
          onClick={() => setSelectedBlock(null)}
        >
          <div
            className="
              w-full
              max-w-sm
              rounded-xl
              border
              border-border
              bg-card
              p-5
              shadow-2xl
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p
                  className="text-xs font-medium"
                  style={{
                    color: selectedBlock.color,
                  }}
                >
                  {selectedBlock.section}
                </p>

                <h2 className="mt-1 text-base font-semibold">{selectedBlock.subject}</h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedBlock(null)}
                className="
                  rounded-lg
                  p-1.5
                  text-muted-foreground
                  hover:bg-muted
                  hover:text-foreground
                "
              >
                <X size={15} />
              </button>
            </div>

            {/* Details */}
            <div className="space-y-3">
              {[
                ['Faculty', selectedBlock.faculty],
                ['Room', selectedBlock.room],
                ['Day', selectedBlock.day],
                ['Time', TIMES[selectedBlock.period]],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-border/40
                    pb-2
                    last:border-0
                  "
                >
                  <span className="text-xs text-muted-foreground">{label}</span>

                  <span className="text-xs font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* PUBLISH MODAL                                                      */}
      {/* ================================================================== */}

      {showPublish && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/60
            p-4
            backdrop-blur-sm
          "
          onClick={() => setShowPublish(false)}
        >
          <div
            className="
              w-full
              max-w-[440px]
              animate-slide-in-up
              rounded-xl
              border
              border-border
              bg-card
              p-6
              shadow-2xl
            "
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal header */}
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-base font-semibold">Ready to Publish?</h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  Review the timetable before making it available.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPublish(false)}
                className="
                  rounded-lg
                  p-1.5
                  text-muted-foreground
                  hover:bg-muted
                  hover:text-foreground
                "
              >
                <X size={15} />
              </button>
            </div>

            {/* Readiness */}
            <div
              className="
                mb-5
                overflow-hidden
                rounded-lg
                border
                border-border/50
              "
            >
              {readinessItems.map((item) => (
                <div
                  key={item}
                  className="
                      flex
                      items-center
                      justify-between
                      border-b
                      border-border/40
                      px-3
                      py-2
                      last:border-b-0
                    "
                >
                  <span className="text-xs text-muted-foreground">{item}</span>

                  <span
                    className="
                        flex
                        items-center
                        gap-1.5
                        text-[10px]
                        font-medium
                        text-emerald-400
                      "
                  >
                    <Check size={12} />
                    Ready
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mb-4 grid grid-cols-3 gap-2">
              {[
                {
                  label: 'Classes',
                  value: '160',
                },
                {
                  label: 'Faculty',
                  value: '18',
                },
                {
                  label: 'Rooms',
                  value: '12',
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="
                    rounded-lg
                    border
                    border-border/50
                    bg-muted/20
                    p-3
                    text-center
                  "
                >
                  <p className="text-sm font-semibold">{stat.value}</p>

                  <p className="mt-0.5 text-[10px] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Warning */}
            <div
              className="
                mb-5
                flex
                items-center
                gap-2.5
                rounded-lg
                border
                border-amber-500/15
                bg-amber-500/5
                px-3
                py-2.5
              "
            >
              <AlertCircle size={13} className="shrink-0 text-amber-400" />

              <p className="text-[10px] leading-relaxed text-amber-400/90">
                2 soft constraint warnings — publishing is still allowed.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowPublish(false)}
                className="
                  flex-1
                  rounded-lg
                  border
                  border-border
                  bg-muted/20
                  px-4
                  py-2
                  text-xs
                  font-medium
                  text-muted-foreground
                  transition-colors
                  hover:bg-muted
                  hover:text-foreground
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  setPublished(true);
                  setShowPublish(false);
                }}
                className="
                  flex-1
                  rounded-lg
                  bg-primary
                  px-4
                  py-2
                  text-xs
                  font-medium
                  text-primary-foreground
                  transition-colors
                  hover:bg-primary/90
                "
              >
                Publish Timetable
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
