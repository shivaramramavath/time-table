import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Settings,
  Calendar,
  Clock,
  Coffee,
  BookOpen,
  Users,
  DoorOpen,
  Shield,
  Sliders,
  Zap,
  Monitor,
  ChevronDown,
  Plus,
  Trash2,
  Edit2,
  Info,
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  Save,
  X,
  GripVertical,
  Globe,
  Hash,
  AlignLeft,
  Building2,
  Layers,
  Sun,
  LayoutGrid,
  FlaskConical,
  LockKeyhole,
  ListChecks,
  CalendarRange,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────

interface BreakRow {
  id: string;
  name: string;
  duration: number;
  afterPeriod: number;
  type: 'Short Break' | 'Lunch' | 'Custom';
}

interface SoftConstraint {
  id: string;
  label: string;
  enabled: boolean;
  weight: number;
}

interface PrefsState {
  // General
  name: string;
  academicYear: string;
  semester: string;
  department: string;
  program: string;
  section: string;
  weekStartsOn: string;
  timezone: string;
  // Working Days
  workingDays: Record<string, boolean>;
  saturdaySchedule: 'Full Day' | 'Half Day' | 'Holiday';
  alternateSaturdays: boolean;
  // Timing
  startTime: string;
  endTime: string;
  numPeriods: number;
  periodDuration: number;
  variableDuration: boolean;
  // Breaks
  breaksEnabled: boolean;
  breaks: BreakRow[];
  // Subjects
  theoryDuration: number;
  labDuration: number;
  tutorialDuration: number;
  classesPerWeek: number;
  maxClassesPerDay: number;
  maxSameSubjectPerDay: number;
  allowConsecutive: boolean;
  requireConsecutiveLabs: boolean;
  avoidRepeatConsecutive: boolean;
  preferredDistribution: string;
  // Faculty
  facultyMaxPerDay: number;
  facultyMaxPerWeek: number;
  facultyMaxConsecutive: number;
  facultyMinGap: number;
  respectFacultyAvail: boolean;
  respectPreferredPeriods: boolean;
  avoidFirstPeriod: boolean;
  avoidLastPeriod: boolean;
  allowFreePeriods: boolean;
  // Rooms
  respectRoomAvail: boolean;
  respectRoomCapacity: boolean;
  requireCompatibleRoom: boolean;
  labRequiresLab: boolean;
  maxRoomUsagePerDay: number;
  // Labs
  labConsecutivePeriods: number;
  maxLabsPerDay: number;
  preferredLabPeriod: string;
  allowLabLastPeriod: boolean;
  allowSharedLabs: boolean;
  // Sections
  sectionMaxPerDay: number;
  sectionMinPerDay: number;
  sectionMaxConsecutive: number;
  sectionMaxFreePeriods: number;
  // Distribution
  subjectMinGap: number;
  balanceWorkingDays: boolean;
  avoidSubjectClustering: boolean;
  spreadLabs: boolean;
  preferredSubjectDays: string;
  manualLocks: string[];
  // Hard constraints
  hardConstraints: Record<string, boolean>;
  // Soft constraints
  softConstraints: SoftConstraint[];
  // Generation
  strategy: 'Balanced' | 'Constraint First' | 'Optimization';
  maxAttempts: number;
  autoFaculty: boolean;
  autoRoom: boolean;
  autoPeriod: boolean;
  autoLabs: boolean;
  autoBreaks: boolean;
  autoResolveConflicts: boolean;
  preserveLockedSlots: boolean;
  regenerateConflicting: boolean;
  optPriorities: Record<string, number>;
  // Display
  showFacultyName: boolean;
  showRoomNumber: boolean;
  showSubjectCode: boolean;
  showSubjectName: boolean;
  showFacultyInitials: boolean;
  showBreaks: boolean;
  showEmptyPeriods: boolean;
  compactMode: boolean;
  showPeriodNumbers: boolean;
  showTimeRange: boolean;
  colorBy: 'Subject' | 'Faculty' | 'Room';
  // Advanced
  randomizationEnabled: boolean;
  randomSeed: string;
  maxSolverIterations: number;
  conflictTolerance: number;
  allowSoftRelaxation: boolean;
  debugGeneration: boolean;
  saveGenerationLogs: boolean;
}

const DEFAULT_PREFS: PrefsState = {
  name: 'CSE B.Tech Timetable',
  academicYear: '2026-27',
  semester: '1st Semester',
  department: 'Computer Science & Engineering',
  program: 'B.Tech',
  section: 'CSE-A',
  weekStartsOn: 'Monday',
  timezone: 'Asia/Kolkata',
  workingDays: {
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: false,
  },
  saturdaySchedule: 'Half Day',
  alternateSaturdays: false,
  startTime: '08:30',
  endTime: '16:30',
  numPeriods: 7,
  periodDuration: 50,
  variableDuration: false,
  breaksEnabled: true,
  breaks: [
    { id: 'b1', name: 'Short Break', duration: 15, afterPeriod: 3, type: 'Short Break' },
    { id: 'b2', name: 'Lunch Break', duration: 50, afterPeriod: 4, type: 'Lunch' },
  ],
  theoryDuration: 50,
  labDuration: 100,
  tutorialDuration: 50,
  classesPerWeek: 4,
  maxClassesPerDay: 2,
  maxSameSubjectPerDay: 1,
  allowConsecutive: false,
  requireConsecutiveLabs: true,
  avoidRepeatConsecutive: true,
  preferredDistribution: 'Even',
  facultyMaxPerDay: 5,
  facultyMaxPerWeek: 25,
  facultyMaxConsecutive: 3,
  facultyMinGap: 0,
  respectFacultyAvail: true,
  respectPreferredPeriods: true,
  avoidFirstPeriod: false,
  avoidLastPeriod: false,
  allowFreePeriods: true,
  respectRoomAvail: true,
  respectRoomCapacity: true,
  requireCompatibleRoom: true,
  labRequiresLab: true,
  maxRoomUsagePerDay: 8,
  labConsecutivePeriods: 2,
  maxLabsPerDay: 2,
  preferredLabPeriod: 'Morning',
  allowLabLastPeriod: false,
  allowSharedLabs: false,
  sectionMaxPerDay: 8,
  sectionMinPerDay: 4,
  sectionMaxConsecutive: 4,
  sectionMaxFreePeriods: 2,
  subjectMinGap: 1,
  balanceWorkingDays: true,
  avoidSubjectClustering: true,
  spreadLabs: true,
  preferredSubjectDays: 'Mon, Tue, Thu, Fri',
  manualLocks: [],
  hardConstraints: {
    noFacultyDoubleBook: true,
    noRoomDoubleBook: true,
    noSectionDoubleBook: true,
    facultyAvailable: true,
    roomAvailable: true,
    roomCapacity: true,
    labRequiresLabRoom: true,
    noClassDuringBreak: true,
    weeklyHoursSatisfied: true,
  },
  softConstraints: [
    { id: 'sc1', label: 'Avoid consecutive classes for faculty', enabled: true, weight: 70 },
    { id: 'sc2', label: 'Balance classes across days', enabled: true, weight: 80 },
    { id: 'sc3', label: 'Avoid too many labs in one day', enabled: true, weight: 60 },
    { id: 'sc4', label: 'Avoid scheduling in first period', enabled: false, weight: 40 },
    { id: 'sc5', label: 'Avoid scheduling in last period', enabled: false, weight: 40 },
    { id: 'sc6', label: 'Minimize free gaps in section schedule', enabled: true, weight: 65 },
    { id: 'sc7', label: 'Prefer faculty preferred periods', enabled: true, weight: 75 },
    { id: 'sc8', label: 'Prefer faculty preferred days', enabled: true, weight: 55 },
    {
      id: 'sc9',
      label: 'Distribute same subject across different days',
      enabled: true,
      weight: 85,
    },
  ],
  strategy: 'Balanced',
  maxAttempts: 100,
  autoFaculty: true,
  autoRoom: true,
  autoPeriod: true,
  autoLabs: true,
  autoBreaks: true,
  autoResolveConflicts: false,
  preserveLockedSlots: true,
  regenerateConflicting: false,
  optPriorities: {
    subjectDistribution: 80,
    facultyPreferences: 70,
    roomUtilization: 60,
    sectionBalance: 75,
    minimizeGaps: 65,
    resourceUtilization: 55,
  },
  showFacultyName: true,
  showRoomNumber: true,
  showSubjectCode: true,
  showSubjectName: true,
  showFacultyInitials: false,
  showBreaks: true,
  showEmptyPeriods: true,
  compactMode: false,
  showPeriodNumbers: true,
  showTimeRange: true,
  colorBy: 'Subject',
  randomizationEnabled: false,
  randomSeed: '42',
  maxSolverIterations: 10000,
  conflictTolerance: 0,
  allowSoftRelaxation: true,
  debugGeneration: false,
  saveGenerationLogs: false,
};

// ─── UI Primitives ───────────────────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={!disabled ? onChange : undefined}
      disabled={disabled}
      className={`relative w-9 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${checked ? 'bg-[#6366f1]' : 'bg-[#262626]'} ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${checked ? 'left-[18px]' : 'left-0.5'}`}
      />
    </button>
  );
}

function FieldLabel({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-1.5">
      <span className="text-xs font-medium text-[#a0a0a0]">{children}</span>
      {hint && (
        <div className="relative group/hint">
          <Info size={11} className="text-[#444] cursor-help" />
          <div className="hidden group-hover/hint:block absolute left-5 -top-1 z-30 w-52 bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-3 py-2 text-[11px] text-[#a0a0a0] shadow-xl leading-relaxed whitespace-normal">
            {hint}
          </div>
        </div>
      )}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
  className = '',
  disabled,
}: {
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full h-9 px-3 text-xs text-white bg-[#101010] border border-[#222] rounded-lg outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f130] transition-all placeholder-[#444] disabled:opacity-40 ${className}`}
    />
  );
}

function Select({
  value,
  onChange,
  options,
  className = '',
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full h-9 px-3 text-xs text-white bg-[#101010] border border-[#222] rounded-lg outline-none focus:border-[#6366f1] transition-all appearance-none cursor-pointer ${className}`}
      style={{ fontFamily: 'inherit' }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <input
      type="number"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-9 px-3 text-xs text-white bg-[#101010] border border-[#222] rounded-lg outline-none focus:border-[#6366f1] transition-all"
      style={{ fontFamily: 'inherit' }}
    />
  );
}

function ToggleRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[#111] last:border-0">
      <div className="flex items-center gap-1.5 min-w-0 pr-4">
        <span className="text-xs text-[#c0c0c0]">{label}</span>
        {hint && (
          <div className="relative group/hint flex-shrink-0">
            <Info size={11} className="text-[#333] cursor-help" />
            <div className="hidden group-hover/hint:block absolute left-5 -top-1 z-30 w-52 bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-3 py-2 text-[11px] text-[#a0a0a0] shadow-xl leading-relaxed">
              {hint}
            </div>
          </div>
        )}
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

function Card({
  id,
  title,
  subtitle,
  children,
  badge,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  badge?: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl overflow-hidden scroll-mt-6"
    >
      <div className="px-5 py-4 border-b border-[#1a1a1a] flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          {subtitle && <p className="text-[11px] text-[#555] mt-0.5 leading-relaxed">{subtitle}</p>}
        </div>
        {badge}
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

function FormGrid({ children, cols = 2 }: { children: React.ReactNode; cols?: number }) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 ${cols === 2 ? 'sm:grid-cols-2' : cols === 3 ? 'sm:grid-cols-3' : ''}`}
    >
      {children}
    </div>
  );
}

function WeightSlider({
  label,
  value,
  onChange,
  enabled,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  enabled: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 ${!enabled ? 'opacity-40' : ''}`}>
      <span className="text-xs text-[#666] w-52 flex-shrink-0">{label}</span>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        disabled={!enabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer accent-[#6366f1] bg-[#1e1e1e]"
      />
      <span className="text-xs font-mono text-[#a0a0a0] w-8 text-right flex-shrink-0">{value}</span>
    </div>
  );
}

// ─── Period Timeline ─────────────────────────────────────────────────────────

function computePeriodTimeline(
  startTime: string,
  numPeriods: number,
  periodDuration: number,
  breaks: BreakRow[],
) {
  const [h, m] = startTime.split(':').map(Number);
  let current = h * 60 + m;
  const fmt = (mins: number) => {
    const hh = Math.floor(mins / 60) % 24;
    const mm = mins % 60;
    const ampm = hh < 12 ? 'AM' : 'PM';
    const hr = hh % 12 === 0 ? 12 : hh % 12;
    return `${hr.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')} ${ampm}`;
  };

  const rows: { label: string; from: string; to: string; type: 'period' | 'break' }[] = [];
  for (let i = 1; i <= numPeriods; i++) {
    const start = fmt(current);
    current += periodDuration;
    rows.push({ label: `Period ${i}`, from: start, to: fmt(current), type: 'period' });
    const br = breaks.find((b) => b.afterPeriod === i);
    if (br) {
      const bStart = fmt(current);
      current += br.duration;
      rows.push({ label: br.name, from: bStart, to: fmt(current), type: 'break' });
    }
  }
  return rows;
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'working-days', label: 'Working Days', icon: Calendar },
  { id: 'timing', label: 'Timing & Periods', icon: Clock },
  { id: 'breaks', label: 'Breaks & Lunch', icon: Coffee },
  { id: 'subjects', label: 'Subjects', icon: BookOpen },
  { id: 'labs', label: 'Labs', icon: FlaskConical },
  { id: 'faculty', label: 'Faculty', icon: Users },
  { id: 'rooms', label: 'Rooms', icon: DoorOpen },
  { id: 'sections', label: 'Sections', icon: Layers },
  { id: 'scheduling-rules', label: 'Scheduling Rules', icon: Shield },
  { id: 'distribution', label: 'Distribution', icon: CalendarRange },
  { id: 'generation', label: 'Generation', icon: Zap },
  { id: 'manual-overrides', label: 'Manual Overrides', icon: LockKeyhole },
  { id: 'display', label: 'Display', icon: Monitor },
];

function SideNav({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <nav className="flex flex-col gap-0.5">
      {NAV_SECTIONS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all ${active === id ? 'bg-[#6366f115] text-white border border-[#6366f130]' : 'text-[#555] hover:text-[#a0a0a0] hover:bg-[#111]'}`}
        >
          <Icon size={13} className={active === id ? 'text-[#6366f1]' : 'text-[#333]'} />
          <span className="text-xs font-medium">{label}</span>
        </button>
      ))}
    </nav>
  );
}

function MobileNav({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <div className="lg:hidden border-b border-[#1a1a1a] bg-[#0a0a0a] px-4 py-3">
      <Select
        value={active}
        onChange={onSelect}
        options={NAV_SECTIONS.map(({ id, label }) => ({ value: id, label }))}
      />
    </div>
  );
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function GeneralSection({
  p,
  set,
}: {
  p: PrefsState;
  set: (k: keyof PrefsState, v: unknown) => void;
}) {
  return (
    <Card
      id="general"
      title="General Settings"
      subtitle="Basic configuration for this timetable instance."
    >
      <FormGrid>
        <div>
          <FieldLabel>Timetable Name</FieldLabel>
          <Input
            value={p.name}
            onChange={(v) => set('name', v)}
            placeholder="e.g. CSE B.Tech Timetable"
          />
        </div>
        <div>
          <FieldLabel>Academic Year</FieldLabel>
          <Input
            value={p.academicYear}
            onChange={(v) => set('academicYear', v)}
            placeholder="e.g. 2026-27"
          />
        </div>
        <div>
          <FieldLabel>Semester</FieldLabel>
          <Select
            value={p.semester}
            onChange={(v) => set('semester', v)}
            options={['1st Semester', '2nd Semester'].map((x) => ({ label: x, value: x }))}
          />
        </div>
        <div>
          <FieldLabel>Department</FieldLabel>
          <Input value={p.department} onChange={(v) => set('department', v)} />
        </div>
        <div>
          <FieldLabel>Program</FieldLabel>
          <Select
            value={p.program}
            onChange={(v) => set('program', v)}
            options={['B.Tech', 'M.Tech', 'MBA', 'MCA', 'BCA'].map((x) => ({ label: x, value: x }))}
          />
        </div>
        <div>
          <FieldLabel>Section</FieldLabel>
          <Input value={p.section} onChange={(v) => set('section', v)} placeholder="e.g. CSE-A" />
        </div>
        <div>
          <FieldLabel>Week Starts On</FieldLabel>
          <Select
            value={p.weekStartsOn}
            onChange={(v) => set('weekStartsOn', v)}
            options={['Monday', 'Sunday'].map((x) => ({ label: x, value: x }))}
          />
        </div>
        <div>
          <FieldLabel>Time Zone</FieldLabel>
          <Select
            value={p.timezone}
            onChange={(v) => set('timezone', v)}
            options={['Asia/Kolkata', 'UTC', 'America/New_York', 'Europe/London'].map((x) => ({
              label: x,
              value: x,
            }))}
          />
        </div>
      </FormGrid>
    </Card>
  );
}

function WorkingDaysSection({
  p,
  set,
}: {
  p: PrefsState;
  set: (k: keyof PrefsState, v: unknown) => void;
}) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const activeCount = Object.values(p.workingDays).filter(Boolean).length;

  return (
    <Card
      id="working-days"
      title="Working Days"
      subtitle="Define which days are active in the timetable schedule."
    >
      <div className="space-y-5">
        <div>
          <FieldLabel>Select Active Days</FieldLabel>
          <div className="flex flex-wrap gap-2 mt-1">
            {days.map((day) => {
              const on = p.workingDays[day];
              return (
                <button
                  key={day}
                  onClick={() => set('workingDays', { ...p.workingDays, [day]: !on })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${on ? 'bg-[#6366f115] text-white border-[#6366f140]' : 'bg-[#111] text-[#444] border-[#1a1a1a] hover:border-[#2a2a2a] hover:text-[#666]'}`}
                >
                  {day.slice(0, 3)}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-[#555] mt-2">
            <span className="text-[#22c55e] font-medium">{activeCount}</span> working days per week
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <FieldLabel hint="How Saturday is scheduled if it's a working day.">
              Saturday Schedule
            </FieldLabel>
            <div className="flex gap-1.5">
              {(['Full Day', 'Half Day', 'Holiday'] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => set('saturdaySchedule', opt)}
                  className={`flex-1 py-1.5 rounded-lg text-xs border transition-all ${p.saturdaySchedule === opt ? 'bg-[#6366f115] text-white border-[#6366f140]' : 'bg-[#111] text-[#444] border-[#1a1a1a] hover:border-[#2a2a2a] hover:text-[#666]'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end pb-0.5">
            <div className="flex items-center justify-between w-full py-2.5 px-3 bg-[#111] border border-[#1a1a1a] rounded-lg">
              <span className="text-xs text-[#a0a0a0]">Alternate Saturdays</span>
              <Toggle
                checked={p.alternateSaturdays}
                onChange={() => set('alternateSaturdays', !p.alternateSaturdays)}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function TimingSection({
  p,
  set,
}: {
  p: PrefsState;
  set: (k: keyof PrefsState, v: unknown) => void;
}) {
  const timeline = computePeriodTimeline(p.startTime, p.numPeriods, p.periodDuration, p.breaks);

  return (
    <>
      <Card
        id="timing"
        title="Timetable Timing"
        subtitle="Set the college hours and period structure."
      >
        <div className="space-y-4">
          <FormGrid cols={2}>
            <div>
              <FieldLabel>College Start Time</FieldLabel>
              <Input type="time" value={p.startTime} onChange={(v) => set('startTime', v)} />
            </div>
            <div>
              <FieldLabel>College End Time</FieldLabel>
              <Input type="time" value={p.endTime} onChange={(v) => set('endTime', v)} />
            </div>
            <div>
              <FieldLabel hint="Total number of teaching periods in a day (excluding breaks).">
                Number of Periods
              </FieldLabel>
              <NumberInput
                value={p.numPeriods}
                onChange={(v) => set('numPeriods', v)}
                min={1}
                max={15}
              />
            </div>
            <div>
              <FieldLabel hint="Default duration in minutes for a single period.">
                Period Duration (min)
              </FieldLabel>
              <NumberInput
                value={p.periodDuration}
                onChange={(v) => set('periodDuration', v)}
                min={20}
                max={120}
                step={5}
              />
            </div>
          </FormGrid>
          <div className="flex items-center justify-between py-2.5 px-3 bg-[#111] border border-[#1a1a1a] rounded-lg">
            <div>
              <p className="text-xs text-[#a0a0a0]">Allow Variable Period Duration</p>
              <p className="text-[10px] text-[#444] mt-0.5">
                Individual periods can have custom durations
              </p>
            </div>
            <Toggle
              checked={p.variableDuration}
              onChange={() => set('variableDuration', !p.variableDuration)}
            />
          </div>
        </div>
      </Card>

      {/* Period timeline */}
      <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#1a1a1a] flex items-center justify-between">
          <p className="text-xs font-semibold text-white">Period Timeline</p>
          <span className="text-[10px] text-[#444]">Auto-computed from timing settings</span>
        </div>
        <div className="divide-y divide-[#111]">
          {timeline.map((row, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 px-5 py-2.5 ${row.type === 'break' ? 'bg-[#f59e0b08]' : ''}`}
            >
              <div className="flex items-center gap-2 w-36 flex-shrink-0">
                <div
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${row.type === 'break' ? 'bg-[#f59e0b]' : 'bg-[#6366f1]'}`}
                />
                <span
                  className={`text-xs font-medium ${row.type === 'break' ? 'text-[#f59e0b]' : 'text-white'}`}
                >
                  {row.label}
                </span>
              </div>
              <span className="text-xs text-[#555] font-mono">{row.from}</span>
              <span className="text-[10px] text-[#333]">→</span>
              <span className="text-xs text-[#555] font-mono">{row.to}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function BreaksSection({
  p,
  set,
}: {
  p: PrefsState;
  set: (k: keyof PrefsState, v: unknown) => void;
}) {
  const [editing, setEditing] = useState<string | null>(null);

  const addBreak = () => {
    const newBr: BreakRow = {
      id: `b${Date.now()}`,
      name: 'New Break',
      duration: 15,
      afterPeriod: 3,
      type: 'Short Break',
    };
    set('breaks', [...p.breaks, newBr]);
    setEditing(newBr.id);
  };

  const updateBreak = (id: string, updates: Partial<BreakRow>) => {
    set(
      'breaks',
      p.breaks.map((b) => (b.id === id ? { ...b, ...updates } : b)),
    );
  };

  const deleteBreak = (id: string) => {
    set(
      'breaks',
      p.breaks.filter((b) => b.id !== id),
    );
  };

  const TYPE_COLORS = { 'Short Break': '#6366f1', Lunch: '#f97316', Custom: '#8b5cf6' };

  return (
    <Card
      id="breaks"
      title="Break Configuration"
      subtitle="Define breaks that interrupt the class schedule."
      badge={
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#555]">Breaks enabled</span>
          <Toggle
            checked={p.breaksEnabled}
            onChange={() => set('breaksEnabled', !p.breaksEnabled)}
          />
        </div>
      }
    >
      <div className={`space-y-3 ${!p.breaksEnabled ? 'opacity-40 pointer-events-none' : ''}`}>
        {p.breaks.map((br) => (
          <div key={br.id}>
            <div className="flex items-center gap-3 px-3 py-2.5 bg-[#111] border border-[#1a1a1a] rounded-xl hover:border-[#222] transition-colors group/br">
              <GripVertical size={13} className="text-[#2a2a2a]" />
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: TYPE_COLORS[br.type] }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-white">{br.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md text-[#555] bg-[#1a1a1a] border border-[#222]">
                    {br.type}
                  </span>
                </div>
                <p className="text-[10px] text-[#444] mt-0.5">
                  {br.duration} min · After Period {br.afterPeriod}
                </p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover/br:opacity-100 transition-opacity">
                <button
                  onClick={() => setEditing(editing === br.id ? null : br.id)}
                  className="p-1.5 hover:bg-[#1e1e1e] rounded-lg transition-colors"
                >
                  <Edit2 size={12} className="text-[#555]" />
                </button>
                <button
                  onClick={() => deleteBreak(br.id)}
                  className="p-1.5 hover:bg-[#ef444415] rounded-lg transition-colors"
                >
                  <Trash2 size={12} className="text-[#ef4444]" />
                </button>
              </div>
            </div>

            {editing === br.id && (
              <div className="mt-1.5 ml-6 p-3 bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl space-y-3 animate-slide-in-up">
                <FormGrid cols={2}>
                  <div>
                    <FieldLabel>Break Name</FieldLabel>
                    <Input value={br.name} onChange={(v) => updateBreak(br.id, { name: v })} />
                  </div>
                  <div>
                    <FieldLabel>Type</FieldLabel>
                    <Select
                      value={br.type}
                      onChange={(v) => updateBreak(br.id, { type: v as BreakRow['type'] })}
                      options={['Short Break', 'Lunch', 'Custom'].map((x) => ({
                        label: x,
                        value: x,
                      }))}
                    />
                  </div>
                  <div>
                    <FieldLabel>Duration (min)</FieldLabel>
                    <NumberInput
                      value={br.duration}
                      onChange={(v) => updateBreak(br.id, { duration: v })}
                      min={5}
                      max={120}
                      step={5}
                    />
                  </div>
                  <div>
                    <FieldLabel>After Period</FieldLabel>
                    <NumberInput
                      value={br.afterPeriod}
                      onChange={(v) => updateBreak(br.id, { afterPeriod: v })}
                      min={1}
                      max={p.numPeriods - 1}
                    />
                  </div>
                </FormGrid>
                <button
                  onClick={() => setEditing(null)}
                  className="text-xs text-[#6366f1] hover:underline"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addBreak}
          className="flex items-center gap-1.5 w-full px-3 py-2 text-xs text-[#555] border border-dashed border-[#1e1e1e] rounded-xl hover:border-[#2a2a2a] hover:text-[#a0a0a0] transition-all"
        >
          <Plus size={12} />
          Add Break
        </button>
      </div>
    </Card>
  );
}

function SubjectsSection({
  p,
  set,
}: {
  p: PrefsState;
  set: (k: keyof PrefsState, v: unknown) => void;
}) {
  return (
    <Card
      id="subjects"
      title="Subject Scheduling Preferences"
      subtitle="Rules governing how subjects are distributed across the timetable."
    >
      <div className="space-y-5">
        <div>
          <p className="text-[10px] font-semibold text-[#444] uppercase tracking-wider mb-3">
            Duration Defaults (minutes)
          </p>
          <FormGrid cols={3}>
            <div>
              <FieldLabel>Theory</FieldLabel>
              <NumberInput
                value={p.theoryDuration}
                onChange={(v) => set('theoryDuration', v)}
                min={30}
                max={120}
                step={5}
              />
            </div>
            <div>
              <FieldLabel>Lab</FieldLabel>
              <NumberInput
                value={p.labDuration}
                onChange={(v) => set('labDuration', v)}
                min={60}
                max={240}
                step={10}
              />
            </div>
            <div>
              <FieldLabel>Tutorial</FieldLabel>
              <NumberInput
                value={p.tutorialDuration}
                onChange={(v) => set('tutorialDuration', v)}
                min={30}
                max={120}
                step={5}
              />
            </div>
          </FormGrid>
        </div>

        <div>
          <p className="text-[10px] font-semibold text-[#444] uppercase tracking-wider mb-3">
            Frequency Constraints
          </p>
          <FormGrid cols={3}>
            <div>
              <FieldLabel hint="Target number of classes per subject per week.">
                Classes / Week
              </FieldLabel>
              <NumberInput
                value={p.classesPerWeek}
                onChange={(v) => set('classesPerWeek', v)}
                min={1}
                max={10}
              />
            </div>
            <div>
              <FieldLabel hint="Maximum number of times any subject can appear in a single day.">
                Max / Day
              </FieldLabel>
              <NumberInput
                value={p.maxClassesPerDay}
                onChange={(v) => set('maxClassesPerDay', v)}
                min={1}
                max={5}
              />
            </div>
            <div>
              <FieldLabel hint="Maximum occurrences of the same subject in one day.">
                Max Same Subject / Day
              </FieldLabel>
              <NumberInput
                value={p.maxSameSubjectPerDay}
                onChange={(v) => set('maxSameSubjectPerDay', v)}
                min={1}
                max={3}
              />
            </div>
          </FormGrid>
        </div>

        <div>
          <p className="text-[10px] font-semibold text-[#444] uppercase tracking-wider mb-2">
            Scheduling Behaviour
          </p>
          <div>
            <ToggleRow
              label="Allow consecutive theory periods for the same subject"
              checked={p.allowConsecutive}
              onChange={() => set('allowConsecutive', !p.allowConsecutive)}
            />
            <ToggleRow
              label="Require consecutive periods for lab sessions"
              hint="Labs must occupy adjacent periods to form a double period."
              checked={p.requireConsecutiveLabs}
              onChange={() => set('requireConsecutiveLabs', !p.requireConsecutiveLabs)}
            />
            <ToggleRow
              label="Avoid scheduling the same subject in consecutive periods"
              checked={p.avoidRepeatConsecutive}
              onChange={() => set('avoidRepeatConsecutive', !p.avoidRepeatConsecutive)}
            />
          </div>
        </div>

        <div>
          <FieldLabel hint="How to distribute a subject's classes across the week.">
            Preferred Distribution
          </FieldLabel>
          <div className="flex gap-1.5 flex-wrap mt-1">
            {['Even', 'Front-Loaded', 'Back-Loaded', 'Clustered'].map((opt) => (
              <button
                key={opt}
                onClick={() => set('preferredDistribution', opt)}
                className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${p.preferredDistribution === opt ? 'bg-[#6366f115] text-white border-[#6366f140]' : 'bg-[#111] text-[#444] border-[#1a1a1a] hover:border-[#2a2a2a] hover:text-[#666]'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function FacultySection({
  p,
  set,
}: {
  p: PrefsState;
  set: (k: keyof PrefsState, v: unknown) => void;
}) {
  return (
    <Card
      id="faculty"
      title="Faculty Constraints"
      subtitle="Limits and preferences applied to faculty scheduling."
    >
      <div className="space-y-5">
        <FormGrid cols={2}>
          <div>
            <FieldLabel>Max Classes / Day</FieldLabel>
            <NumberInput
              value={p.facultyMaxPerDay}
              onChange={(v) => set('facultyMaxPerDay', v)}
              min={1}
              max={10}
            />
          </div>
          <div>
            <FieldLabel>Max Classes / Week</FieldLabel>
            <NumberInput
              value={p.facultyMaxPerWeek}
              onChange={(v) => set('facultyMaxPerWeek', v)}
              min={1}
              max={40}
            />
          </div>
          <div>
            <FieldLabel hint="Maximum number of back-to-back teaching periods.">
              Max Consecutive Classes
            </FieldLabel>
            <NumberInput
              value={p.facultyMaxConsecutive}
              onChange={(v) => set('facultyMaxConsecutive', v)}
              min={1}
              max={6}
            />
          </div>
          <div>
            <FieldLabel hint="Minimum number of free periods between two class assignments.">
              Min Gap Between Classes
            </FieldLabel>
            <NumberInput
              value={p.facultyMinGap}
              onChange={(v) => set('facultyMinGap', v)}
              min={0}
              max={4}
            />
          </div>
        </FormGrid>

        <div>
          <p className="text-[10px] font-semibold text-[#444] uppercase tracking-wider mb-2">
            Availability & Preferences
          </p>
          <ToggleRow
            label="Respect faculty availability windows"
            hint="Faculty cannot be assigned outside their marked available hours."
            checked={p.respectFacultyAvail}
            onChange={() => set('respectFacultyAvail', !p.respectFacultyAvail)}
          />
          <ToggleRow
            label="Prefer faculty's marked preferred periods"
            checked={p.respectPreferredPeriods}
            onChange={() => set('respectPreferredPeriods', !p.respectPreferredPeriods)}
          />
          <ToggleRow
            label="Avoid scheduling faculty in the first period"
            checked={p.avoidFirstPeriod}
            onChange={() => set('avoidFirstPeriod', !p.avoidFirstPeriod)}
          />
          <ToggleRow
            label="Avoid scheduling faculty in the last period"
            checked={p.avoidLastPeriod}
            onChange={() => set('avoidLastPeriod', !p.avoidLastPeriod)}
          />
          <ToggleRow
            label="Allow free/unassigned periods in faculty schedule"
            checked={p.allowFreePeriods}
            onChange={() => set('allowFreePeriods', !p.allowFreePeriods)}
          />
        </div>
      </div>
    </Card>
  );
}

function RoomsSection({
  p,
  set,
}: {
  p: PrefsState;
  set: (k: keyof PrefsState, v: unknown) => void;
}) {
  return (
    <Card
      id="rooms"
      title="Room Constraints"
      subtitle="Rules governing room assignment during scheduling."
    >
      <div className="space-y-5">
        <div>
          <ToggleRow
            label="Respect room availability windows"
            checked={p.respectRoomAvail}
            onChange={() => set('respectRoomAvail', !p.respectRoomAvail)}
          />
          <ToggleRow
            label="Enforce room capacity limits"
            hint="Section size must not exceed room capacity."
            checked={p.respectRoomCapacity}
            onChange={() => set('respectRoomCapacity', !p.respectRoomCapacity)}
          />
          <ToggleRow
            label="Require compatible room type for each subject"
            hint="Theory classes use classrooms, labs use lab rooms, etc."
            checked={p.requireCompatibleRoom}
            onChange={() => set('requireCompatibleRoom', !p.requireCompatibleRoom)}
          />
          <ToggleRow
            label="Lab subjects must be scheduled in lab rooms"
            checked={p.labRequiresLab}
            onChange={() => set('labRequiresLab', !p.labRequiresLab)}
          />
        </div>

        <div>
          <FieldLabel hint="Maximum number of periods a single room can be used in a day.">
            Max Room Usage / Day
          </FieldLabel>
          <div className="w-40">
            <NumberInput
              value={p.maxRoomUsagePerDay}
              onChange={(v) => set('maxRoomUsagePerDay', v)}
              min={1}
              max={12}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

function LabsSection({
  p,
  set,
}: {
  p: PrefsState;
  set: (k: keyof PrefsState, v: unknown) => void;
}) {
  return (
    <Card
      id="labs"
      title="Laboratory Settings"
      subtitle="Configure duration, room requirements, and placement rules for practical sessions."
    >
      <div className="space-y-5">
        <FormGrid cols={2}>
          <div>
            <FieldLabel>Lab Duration (minutes)</FieldLabel>
            <NumberInput
              value={p.labDuration}
              onChange={(v) => set('labDuration', v)}
              min={50}
              max={240}
              step={10}
            />
          </div>
          <div>
            <FieldLabel>Required Consecutive Periods</FieldLabel>
            <NumberInput
              value={p.labConsecutivePeriods}
              onChange={(v) => set('labConsecutivePeriods', v)}
              min={1}
              max={4}
            />
          </div>
          <div>
            <FieldLabel>Maximum Labs / Day</FieldLabel>
            <NumberInput
              value={p.maxLabsPerDay}
              onChange={(v) => set('maxLabsPerDay', v)}
              min={1}
              max={5}
            />
          </div>
          <div>
            <FieldLabel>Preferred Lab Periods</FieldLabel>
            <Select
              value={p.preferredLabPeriod}
              onChange={(v) => set('preferredLabPeriod', v)}
              options={['Morning', 'Afternoon', 'Any time'].map((x) => ({ label: x, value: x }))}
            />
          </div>
        </FormGrid>
        <div>
          <ToggleRow
            label="Require a compatible laboratory room"
            checked={p.labRequiresLab}
            onChange={() => set('labRequiresLab', !p.labRequiresLab)}
          />
          <ToggleRow
            label="Require consecutive periods for lab sessions"
            checked={p.requireConsecutiveLabs}
            onChange={() => set('requireConsecutiveLabs', !p.requireConsecutiveLabs)}
          />
          <ToggleRow
            label="Allow a lab to include the last period"
            checked={p.allowLabLastPeriod}
            onChange={() => set('allowLabLastPeriod', !p.allowLabLastPeriod)}
          />
          <ToggleRow
            label="Allow multiple sections in the same lab"
            checked={p.allowSharedLabs}
            onChange={() => set('allowSharedLabs', !p.allowSharedLabs)}
          />
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-[#6366f130] bg-[#6366f10d] p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6366f120]">
            <FlaskConical size={14} className="text-[#818cf8]" />
          </div>
          <div>
            <p className="text-xs font-medium text-white">Computer Lab</p>
            <p className="mt-0.5 text-[10px] text-[#666]">
              Duration: {p.labConsecutivePeriods} periods · Consecutive:{' '}
              {p.requireConsecutiveLabs ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function SectionsSection({
  p,
  set,
}: {
  p: PrefsState;
  set: (k: keyof PrefsState, v: unknown) => void;
}) {
  return (
    <Card
      id="sections"
      title="Section Settings"
      subtitle="Set the daily timetable limits applied to each student section."
    >
      <div className="space-y-5">
        <FormGrid cols={2}>
          <div>
            <FieldLabel>Maximum Periods / Day</FieldLabel>
            <NumberInput
              value={p.sectionMaxPerDay}
              onChange={(v) => set('sectionMaxPerDay', v)}
              min={1}
              max={12}
            />
          </div>
          <div>
            <FieldLabel>Minimum Periods / Day</FieldLabel>
            <NumberInput
              value={p.sectionMinPerDay}
              onChange={(v) => set('sectionMinPerDay', v)}
              min={1}
              max={12}
            />
          </div>
          <div>
            <FieldLabel>Section Start Time</FieldLabel>
            <Input type="time" value={p.startTime} onChange={(v) => set('startTime', v)} />
          </div>
          <div>
            <FieldLabel>Section End Time</FieldLabel>
            <Input type="time" value={p.endTime} onChange={(v) => set('endTime', v)} />
          </div>
          <div>
            <FieldLabel>Maximum Consecutive Classes</FieldLabel>
            <NumberInput
              value={p.sectionMaxConsecutive}
              onChange={(v) => set('sectionMaxConsecutive', v)}
              min={1}
              max={8}
            />
          </div>
          <div>
            <FieldLabel>Maximum Free Periods</FieldLabel>
            <NumberInput
              value={p.sectionMaxFreePeriods}
              onChange={(v) => set('sectionMaxFreePeriods', v)}
              min={0}
              max={6}
            />
          </div>
        </FormGrid>
        <div className="rounded-xl border border-[#1a1a1a] bg-[#111] p-3">
          <p className="text-xs font-medium text-white">{p.section}</p>
          <p className="mt-1 text-[10px] text-[#555]">
            {Object.values(p.workingDays).filter(Boolean).length} working days ·{' '}
            {p.sectionMinPerDay}–{p.sectionMaxPerDay} periods per day · Lunch follows global
            settings
          </p>
        </div>
      </div>
    </Card>
  );
}

function DistributionSection({
  p,
  set,
}: {
  p: PrefsState;
  set: (k: keyof PrefsState, v: unknown) => void;
}) {
  return (
    <Card
      id="distribution"
      title="Distribution Rules"
      subtitle="Control how classes and labs are spread throughout the academic week."
    >
      <div className="space-y-5">
        <FormGrid cols={2}>
          <div>
            <FieldLabel>Maximum Same Subject / Day</FieldLabel>
            <NumberInput
              value={p.maxSameSubjectPerDay}
              onChange={(v) => set('maxSameSubjectPerDay', v)}
              min={1}
              max={4}
            />
          </div>
          <div>
            <FieldLabel>Minimum Gap Between Same Subject</FieldLabel>
            <NumberInput
              value={p.subjectMinGap}
              onChange={(v) => set('subjectMinGap', v)}
              min={0}
              max={5}
            />
          </div>
          <div>
            <FieldLabel>Maximum Classes / Day</FieldLabel>
            <NumberInput
              value={p.sectionMaxPerDay}
              onChange={(v) => set('sectionMaxPerDay', v)}
              min={1}
              max={12}
            />
          </div>
          <div>
            <FieldLabel>Preferred Subject Days</FieldLabel>
            <Input
              value={p.preferredSubjectDays}
              onChange={(v) => set('preferredSubjectDays', v)}
            />
          </div>
        </FormGrid>
        <div>
          <ToggleRow
            label="Balance classes across working days"
            checked={p.balanceWorkingDays}
            onChange={() => set('balanceWorkingDays', !p.balanceWorkingDays)}
          />
          <ToggleRow
            label="Avoid subject clustering"
            checked={p.avoidSubjectClustering}
            onChange={() => set('avoidSubjectClustering', !p.avoidSubjectClustering)}
          />
          <ToggleRow
            label="Spread labs across different days"
            checked={p.spreadLabs}
            onChange={() => set('spreadLabs', !p.spreadLabs)}
          />
        </div>
        <div className="rounded-xl border border-[#1a1a1a] bg-[#111] p-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-white">Mathematics</p>
            <span className="rounded-full bg-[#6366f115] px-2 py-1 text-[10px] text-[#a5b4fc]">
              Even spread
            </span>
          </div>
          <p className="mt-1 text-[10px] text-[#555]">
            {p.classesPerWeek} classes / week · Maximum {p.maxSameSubjectPerDay} per day ·{' '}
            {p.preferredSubjectDays}
          </p>
        </div>
      </div>
    </Card>
  );
}

function ManualOverridesSection({
  p,
  set,
}: {
  p: PrefsState;
  set: (k: keyof PrefsState, v: unknown) => void;
}) {
  const overrideTypes = [
    'Lock Period',
    'Lock Faculty',
    'Lock Room',
    'Lock Subject',
    'Lock Entire Day',
  ];
  const toggleLock = (label: string) => {
    set(
      'manualLocks',
      p.manualLocks.includes(label)
        ? p.manualLocks.filter((item) => item !== label)
        : [...p.manualLocks, label],
    );
  };
  return (
    <Card
      id="manual-overrides"
      title="Manual Overrides"
      subtitle="Protect important assignments so regeneration never moves them."
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {overrideTypes.map((label) => {
            const locked = p.manualLocks.includes(label);
            return (
              <button
                onClick={() => toggleLock(label)}
                key={label}
                className={`group flex items-center gap-2 rounded-xl border px-3 py-3 text-left transition-all ${locked ? 'border-[#6366f150] bg-[#6366f115]' : 'border-[#1e1e1e] bg-[#111] hover:border-[#6366f150] hover:bg-[#6366f10d]'}`}
              >
                <LockKeyhole
                  size={13}
                  className={locked ? 'text-[#818cf8]' : 'text-[#555] group-hover:text-[#818cf8]'}
                />
                <span className={`text-xs ${locked ? 'text-[#c7d2fe]' : 'text-[#a0a0a0]'}`}>
                  {label}
                </span>
                {locked ? (
                  <CheckCircle2 size={12} className="ml-auto text-[#818cf8]" />
                ) : (
                  <Plus size={12} className="ml-auto text-[#444]" />
                )}
              </button>
            );
          })}
        </div>
        <ToggleRow
          label="Preserve locked slots during regeneration"
          hint="Locked assignments are treated as immovable hard constraints."
          checked={p.preserveLockedSlots}
          onChange={() => set('preserveLockedSlots', !p.preserveLockedSlots)}
        />
        {p.manualLocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#222] py-8 text-center">
            <LockKeyhole size={20} className="mb-2 text-[#333]" />
            <p className="text-xs font-medium text-[#777]">No locked slots yet</p>
            <p className="mt-1 text-[10px] text-[#444]">
              Add an override now, or lock slots directly from the timetable.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-[#1e1e1e] bg-[#111]">
            {p.manualLocks.map((label) => (
              <div
                key={label}
                className="flex items-center justify-between border-b border-[#1a1a1a] px-3 py-2.5 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <LockKeyhole size={12} className="text-[#818cf8]" />
                  <span className="text-xs text-[#aaa]">{label}</span>
                </div>
                <button
                  onClick={() => toggleLock(label)}
                  className="rounded-md p-1 text-[#444] hover:bg-[#ef444415] hover:text-[#ef4444]"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

function SchedulingRulesSection({
  p,
  set,
}: {
  p: PrefsState;
  set: (k: keyof PrefsState, v: unknown) => void;
}) {
  const HARD = [
    {
      id: 'noFacultyDoubleBook',
      label: 'No faculty double-booking',
      desc: 'A faculty member cannot teach two sections simultaneously.',
    },
    {
      id: 'noRoomDoubleBook',
      label: 'No room double-booking',
      desc: 'A room cannot host two classes simultaneously.',
    },
    {
      id: 'noSectionDoubleBook',
      label: 'No section double-booking',
      desc: 'A section cannot attend two classes at the same time.',
    },
    {
      id: 'facultyAvailable',
      label: 'Faculty must be available',
      desc: 'Schedule only within declared faculty availability.',
    },
    {
      id: 'roomAvailable',
      label: 'Room must be available',
      desc: 'Schedule only within declared room availability.',
    },
    {
      id: 'roomCapacity',
      label: 'Room capacity must be sufficient',
      desc: 'Section size ≤ room capacity at all times.',
    },
    {
      id: 'labRequiresLabRoom',
      label: 'Lab sessions require lab rooms',
      desc: 'Lab subjects cannot be placed in regular classrooms.',
    },
    {
      id: 'noClassDuringBreak',
      label: 'No classes during designated breaks',
      desc: 'Breaks are protected — no subject can be placed in a break slot.',
    },
    {
      id: 'weeklyHoursSatisfied',
      label: 'Required weekly subject hours must be met',
      desc: 'Every subject reaches its mandatory weekly period count.',
    },
  ];

  return (
    <>
      <div id="scheduling-rules">
        {/* Hard constraints */}
        <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl overflow-hidden mb-4">
          <div className="px-5 py-4 border-b border-[#1a1a1a] flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#ef444415] border border-[#ef444430] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Shield size={13} className="text-[#ef4444]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Hard Constraints</h3>
              <p className="text-[11px] text-[#555] mt-0.5">
                These rules{' '}
                <span className="text-[#ef4444] font-medium">must never be violated.</span>{' '}
                Disabling them may produce an invalid timetable.
              </p>
            </div>
          </div>
          <div className="px-5 py-3">
            {HARD.map(({ id, label, desc }) => (
              <div
                key={id}
                className="flex items-start gap-3 py-2.5 border-b border-[#111] last:border-0"
              >
                <input
                  type="checkbox"
                  checked={p.hardConstraints[id] ?? true}
                  onChange={() =>
                    set('hardConstraints', { ...p.hardConstraints, [id]: !p.hardConstraints[id] })
                  }
                  className="mt-0.5 accent-[#ef4444] w-3.5 h-3.5 flex-shrink-0 cursor-pointer"
                />
                <div>
                  <p className="text-xs font-medium text-white">{label}</p>
                  <p className="text-[10px] text-[#444] mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soft constraints */}
        <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#1a1a1a] flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#f59e0b15] border border-[#f59e0b30] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Sliders size={13} className="text-[#f59e0b]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Soft Constraints</h3>
              <p className="text-[11px] text-[#555] mt-0.5">
                These rules{' '}
                <span className="text-[#f59e0b] font-medium">improve timetable quality</span> but
                may be relaxed when necessary. Adjust weights to tune priority.
              </p>
            </div>
          </div>
          <div className="px-5 py-3 space-y-1">
            {p.softConstraints.map((sc) => (
              <div key={sc.id} className="py-2.5 border-b border-[#111] last:border-0">
                <div className="flex items-center gap-3 mb-2">
                  <Toggle
                    checked={sc.enabled}
                    onChange={() =>
                      set(
                        'softConstraints',
                        p.softConstraints.map((s) =>
                          s.id === sc.id ? { ...s, enabled: !s.enabled } : s,
                        ),
                      )
                    }
                  />
                  <span className={`text-xs ${sc.enabled ? 'text-white' : 'text-[#444]'}`}>
                    {sc.label}
                  </span>
                </div>
                <div className="pl-12">
                  <WeightSlider
                    label=""
                    value={sc.weight}
                    enabled={sc.enabled}
                    onChange={(v) =>
                      set(
                        'softConstraints',
                        p.softConstraints.map((s) => (s.id === sc.id ? { ...s, weight: v } : s)),
                      )
                    }
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-[9px] text-[#333]">Low priority</span>
                    <span className="text-[9px] text-[#333]">High priority</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function GenerationSection({
  p,
  set,
}: {
  p: PrefsState;
  set: (k: keyof PrefsState, v: unknown) => void;
}) {
  const OPT_LABELS: Record<string, string> = {
    subjectDistribution: 'Subject Distribution',
    facultyPreferences: 'Faculty Preferences',
    roomUtilization: 'Room Utilization',
    sectionBalance: 'Section Balance',
    minimizeGaps: 'Minimize Gaps',
    resourceUtilization: 'Resource Utilization',
  };

  return (
    <>
      <Card
        id="generation"
        title="Timetable Generation"
        subtitle="Control how the scheduling engine builds the timetable."
      >
        <div className="space-y-5">
          <div>
            <FieldLabel hint="The algorithm strategy used during timetable generation.">
              Generation Strategy
            </FieldLabel>
            <div className="flex gap-1.5">
              {(['Balanced', 'Constraint First', 'Optimization'] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => set('strategy', opt)}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-all ${p.strategy === opt ? 'bg-[#6366f115] text-white border-[#6366f140]' : 'bg-[#111] text-[#444] border-[#1a1a1a] hover:border-[#2a2a2a] hover:text-[#666]'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-[#444] mt-1.5">
              {p.strategy === 'Balanced' &&
                'Balances constraints and optimization — recommended for most scenarios.'}
              {p.strategy === 'Constraint First' &&
                'Prioritizes satisfying all hard constraints before applying soft ones.'}
              {p.strategy === 'Optimization' &&
                'Optimizes for soft constraint quality — may take longer to run.'}
            </p>
          </div>

          <div>
            <FieldLabel hint="How many times the solver will retry if it cannot find a valid timetable.">
              Max Generation Attempts
            </FieldLabel>
            <div className="w-40">
              <NumberInput
                value={p.maxAttempts}
                onChange={(v) => set('maxAttempts', v)}
                min={1}
                max={1000}
              />
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold text-[#444] uppercase tracking-wider mb-2">
              Automation
            </p>
            <ToggleRow
              label="Automatically assign faculty to subjects"
              checked={p.autoFaculty}
              onChange={() => set('autoFaculty', !p.autoFaculty)}
            />
            <ToggleRow
              label="Automatically assign rooms to sessions"
              checked={p.autoRoom}
              onChange={() => set('autoRoom', !p.autoRoom)}
            />
            <ToggleRow
              label="Automatically assign periods to sessions"
              checked={p.autoPeriod}
              onChange={() => set('autoPeriod', !p.autoPeriod)}
            />
            <ToggleRow
              label="Automatically schedule lab sessions as double periods"
              checked={p.autoLabs}
              onChange={() => set('autoLabs', !p.autoLabs)}
            />
            <ToggleRow
              label="Automatically insert configured breaks"
              checked={p.autoBreaks}
              onChange={() => set('autoBreaks', !p.autoBreaks)}
            />
          </div>

          <div>
            <p className="text-[10px] font-semibold text-[#444] uppercase tracking-wider mb-2">
              Conflict Handling
            </p>
            <ToggleRow
              label="Automatically resolve scheduling conflicts"
              hint="The engine will try to move conflicting sessions to available slots."
              checked={p.autoResolveConflicts}
              onChange={() => set('autoResolveConflicts', !p.autoResolveConflicts)}
            />
            <ToggleRow
              label="Preserve manually locked time slots"
              hint="Slots locked by the user are never modified during regeneration."
              checked={p.preserveLockedSlots}
              onChange={() => set('preserveLockedSlots', !p.preserveLockedSlots)}
            />
            <ToggleRow
              label="Regenerate only conflicting slots"
              hint="Keep valid portions of the timetable unchanged and only fix conflicts."
              checked={p.regenerateConflicting}
              onChange={() => set('regenerateConflicting', !p.regenerateConflicting)}
            />
          </div>
        </div>
      </Card>

      <Card
        title="Optimization Priorities"
        subtitle="Tune how heavily each factor influences the generated timetable."
      >
        <div className="space-y-3.5">
          {Object.entries(p.optPriorities).map(([key, val]) => (
            <WeightSlider
              key={key}
              label={OPT_LABELS[key] ?? key}
              value={val}
              enabled
              onChange={(v) => set('optPriorities', { ...p.optPriorities, [key]: v })}
            />
          ))}
        </div>
      </Card>
    </>
  );
}

function DisplaySection({
  p,
  set,
}: {
  p: PrefsState;
  set: (k: keyof PrefsState, v: unknown) => void;
}) {
  return (
    <Card
      id="display"
      title="Timetable Display"
      subtitle="Control what information is shown in the generated timetable grid."
    >
      <div className="space-y-5">
        <div>
          <p className="text-[10px] font-semibold text-[#444] uppercase tracking-wider mb-2">
            Visible Information
          </p>
          <div className="grid grid-cols-2 gap-x-6">
            <ToggleRow
              label="Show faculty name"
              checked={p.showFacultyName}
              onChange={() => set('showFacultyName', !p.showFacultyName)}
            />
            <ToggleRow
              label="Show faculty initials"
              checked={p.showFacultyInitials}
              onChange={() => set('showFacultyInitials', !p.showFacultyInitials)}
            />
            <ToggleRow
              label="Show room number"
              checked={p.showRoomNumber}
              onChange={() => set('showRoomNumber', !p.showRoomNumber)}
            />
            <ToggleRow
              label="Show subject code"
              checked={p.showSubjectCode}
              onChange={() => set('showSubjectCode', !p.showSubjectCode)}
            />
            <ToggleRow
              label="Show subject name"
              checked={p.showSubjectName}
              onChange={() => set('showSubjectName', !p.showSubjectName)}
            />
            <ToggleRow
              label="Show breaks in grid"
              checked={p.showBreaks}
              onChange={() => set('showBreaks', !p.showBreaks)}
            />
            <ToggleRow
              label="Show empty periods"
              checked={p.showEmptyPeriods}
              onChange={() => set('showEmptyPeriods', !p.showEmptyPeriods)}
            />
            <ToggleRow
              label="Compact timetable mode"
              hint="Reduces cell padding for denser view."
              checked={p.compactMode}
              onChange={() => set('compactMode', !p.compactMode)}
            />
            <ToggleRow
              label="Show period numbers"
              checked={p.showPeriodNumbers}
              onChange={() => set('showPeriodNumbers', !p.showPeriodNumbers)}
            />
            <ToggleRow
              label="Show time range"
              checked={p.showTimeRange}
              onChange={() => set('showTimeRange', !p.showTimeRange)}
            />
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold text-[#444] uppercase tracking-wider mb-3">
            Color Coding
          </p>
          <div className="flex gap-2">
            {(['Subject', 'Faculty', 'Room'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => set('colorBy', opt)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs border transition-all flex-1 ${p.colorBy === opt ? 'bg-[#6366f115] text-white border-[#6366f140]' : 'bg-[#111] text-[#444] border-[#1a1a1a] hover:border-[#2a2a2a] hover:text-[#666]'}`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${opt === 'Subject' ? 'bg-[#6366f1]' : opt === 'Faculty' ? 'bg-[#22c55e]' : 'bg-[#f97316]'}`}
                />
                Color by {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function AdvancedSection({
  p,
  set,
}: {
  p: PrefsState;
  set: (k: keyof PrefsState, v: unknown) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      id="advanced"
      className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl overflow-hidden scroll-mt-6"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#111] transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <ChevronDown
            size={14}
            className={`text-[#555] transition-transform ${open ? 'rotate-180' : ''}`}
          />
          <div className="text-left">
            <p className="text-sm font-semibold text-white">Advanced Settings</p>
            <p className="text-[11px] text-[#444] mt-0.5">
              Solver configuration — change only if you understand the implications.
            </p>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 bg-[#f59e0b15] text-[#f59e0b] border border-[#f59e0b30] rounded-full">
          Expert
        </span>
      </button>

      {open && (
        <div className="border-t border-[#1a1a1a] px-5 py-4 space-y-5 animate-slide-in-up">
          <div>
            <ToggleRow
              label="Enable randomization in solver"
              hint="Adds controlled randomness to explore more schedule combinations."
              checked={p.randomizationEnabled}
              onChange={() => set('randomizationEnabled', !p.randomizationEnabled)}
            />
          </div>

          <FormGrid cols={2}>
            <div className={p.randomizationEnabled ? '' : 'opacity-40 pointer-events-none'}>
              <FieldLabel hint="Fixed seed for reproducible generation results.">
                Random Seed
              </FieldLabel>
              <Input
                value={p.randomSeed}
                onChange={(v) => set('randomSeed', v)}
                placeholder="e.g. 42"
                disabled={!p.randomizationEnabled}
              />
            </div>
            <div>
              <FieldLabel hint="Maximum solver iterations before giving up.">
                Max Solver Iterations
              </FieldLabel>
              <NumberInput
                value={p.maxSolverIterations}
                onChange={(v) => set('maxSolverIterations', v)}
                min={100}
                max={100000}
                step={100}
              />
            </div>
            <div>
              <FieldLabel hint="Number of hard constraint violations tolerated before aborting. 0 = strict.">
                Conflict Tolerance
              </FieldLabel>
              <NumberInput
                value={p.conflictTolerance}
                onChange={(v) => set('conflictTolerance', v)}
                min={0}
                max={10}
              />
            </div>
          </FormGrid>

          <div>
            <ToggleRow
              label="Allow relaxation of soft constraints when solver is stuck"
              checked={p.allowSoftRelaxation}
              onChange={() => set('allowSoftRelaxation', !p.allowSoftRelaxation)}
            />
            <ToggleRow
              label="Enable debug generation output"
              checked={p.debugGeneration}
              onChange={() => set('debugGeneration', !p.debugGeneration)}
            />
            <ToggleRow
              label="Save generation logs to file"
              checked={p.saveGenerationLogs}
              onChange={() => set('saveGenerationLogs', !p.saveGenerationLogs)}
            />
          </div>

          {p.conflictTolerance > 0 && (
            <div className="flex items-start gap-2 px-3 py-2.5 bg-[#f59e0b10] border border-[#f59e0b20] rounded-xl">
              <AlertTriangle size={13} className="text-[#f59e0b] flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-[#f59e0b]">
                Conflict tolerance is above 0 — the solver may produce a timetable with hard
                constraint violations. Review the generated schedule carefully.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

export default function Preferences() {
  const [prefs, setPrefs] = useState<PrefsState>(DEFAULT_PREFS);
  const [saved, setSaved] = useState<PrefsState>(DEFAULT_PREFS);
  const [activeSection, setActiveSection] = useState('general');
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [showReset, setShowReset] = useState(false);
  const isDirty = JSON.stringify(prefs) !== JSON.stringify(saved);
  const activeDays = Object.entries(prefs.workingDays)
    .filter(([, enabled]) => enabled)
    .map(([day]) => day);
  const lunch = prefs.breaks.find((item) => item.type === 'Lunch');
  const hardCount = Object.values(prefs.hardConstraints).filter(Boolean).length;
  const softCount = prefs.softConstraints.filter((item) => item.enabled).length;

  const set = useCallback((key: keyof PrefsState, value: unknown) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
    setSaveState('idle');
  }, []);

  const handleSave = () => {
    setSaveState('saving');
    setTimeout(() => {
      setSaved(prefs);
      setSaveState('saved');
      setTimeout(() => setSaveState('idle'), 2000);
    }, 800);
  };

  const handleReset = () => {
    setPrefs(DEFAULT_PREFS);
    setShowReset(false);
    setSaveState('idle');
  };

  const sectionIndex = NAV_SECTIONS.findIndex((section) => section.id === activeSection);
  const ActiveSection = () => {
    switch (activeSection) {
      case 'working-days':
        return <WorkingDaysSection p={prefs} set={set} />;
      case 'timing':
        return <TimingSection p={prefs} set={set} />;
      case 'breaks':
        return <BreaksSection p={prefs} set={set} />;
      case 'subjects':
        return <SubjectsSection p={prefs} set={set} />;
      case 'labs':
        return <LabsSection p={prefs} set={set} />;
      case 'faculty':
        return <FacultySection p={prefs} set={set} />;
      case 'rooms':
        return <RoomsSection p={prefs} set={set} />;
      case 'sections':
        return <SectionsSection p={prefs} set={set} />;
      case 'scheduling-rules':
        return <SchedulingRulesSection p={prefs} set={set} />;
      case 'distribution':
        return <DistributionSection p={prefs} set={set} />;
      case 'generation':
        return <GenerationSection p={prefs} set={set} />;
      case 'manual-overrides':
        return <ManualOverridesSection p={prefs} set={set} />;
      case 'display':
        return <DisplaySection p={prefs} set={set} />;
      default:
        return <GeneralSection p={prefs} set={set} />;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#080808]">
      {/* Page header */}
      <div className="flex flex-shrink-0 items-center justify-between gap-4 border-b border-[#1a1a1a] bg-[#0a0a0a] px-4 py-4 sm:px-6 xl:px-8">
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-1.5 text-[10px] text-[#444]">
            <span>Timetable</span>
            <span>/</span>
            <span className="text-[#666]">Preferences</span>
          </div>
          <h1 className="text-base font-semibold text-white">Timetable Preferences</h1>
          <p className="mt-0.5 hidden text-xs text-[#555] sm:block">
            Configure working days, periods, breaks, resources and scheduling rules.
          </p>
        </div>

        <div className="flex flex-shrink-0 items-center gap-2">
          {isDirty && (
            <span className="flex items-center gap-1.5 text-[11px] text-[#f59e0b] mr-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
              Unsaved changes
            </span>
          )}
          {saveState === 'saved' && (
            <span className="flex items-center gap-1.5 text-[11px] text-[#22c55e] mr-1">
              <CheckCircle2 size={12} />
              Saved
            </span>
          )}
          <button
            onClick={() => setShowReset(true)}
            className="hidden items-center gap-1.5 rounded-xl border border-[#1a1a1a] bg-[#111] px-3 py-2 text-xs text-[#555] transition-all hover:border-[#2a2a2a] hover:text-[#a0a0a0] sm:flex"
          >
            <RotateCcw size={12} />
            Reset to Defaults
          </button>
          <button
            onClick={handleSave}
            disabled={saveState === 'saving'}
            className="flex items-center gap-1.5 rounded-xl bg-[#6366f1] px-3 py-2 text-xs font-medium text-white transition-all hover:bg-[#5558e8] disabled:opacity-60 sm:px-4"
          >
            {saveState === 'saving' ? (
              <>
                <div className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={12} />
                Save Preferences
              </>
            )}
          </button>
        </div>
      </div>

      {/* Body */}
      <MobileNav active={activeSection} onSelect={setActiveSection} />
      <div className="flex flex-1 overflow-hidden">
        {/* Left nav */}
        <div className="hidden w-[210px] flex-shrink-0 overflow-y-auto border-r border-[#1a1a1a] bg-[#0a0a0a] px-3 py-4 lg:block xl:w-[220px]">
          <p className="mb-2 px-3 text-[9px] font-semibold uppercase tracking-widest text-[#333]">
            Configuration
          </p>
          <SideNav active={activeSection} onSelect={setActiveSection} />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto grid max-w-6xl gap-5 px-4 py-5 sm:px-6 xl:grid-cols-[minmax(0,1fr)_260px] xl:px-8">
            <div className="min-w-0 space-y-4">
              <div className="flex items-center justify-between px-1">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-widest text-[#4f46e5]">
                    Step {sectionIndex + 1} of {NAV_SECTIONS.length}
                  </p>
                  <p className="mt-1 text-xs text-[#555]">
                    Changes are kept locally until you save your preferences.
                  </p>
                </div>
                <span className="rounded-full border border-[#222] bg-[#111] px-2.5 py-1 text-[10px] text-[#666]">
                  {Math.round(((sectionIndex + 1) / NAV_SECTIONS.length) * 100)}% configured
                </span>
              </div>
              <ActiveSection />
              <div className="flex items-center justify-between pt-1">
                <button
                  disabled={sectionIndex === 0}
                  onClick={() => setActiveSection(NAV_SECTIONS[sectionIndex - 1].id)}
                  className="rounded-xl border border-[#1e1e1e] bg-[#111] px-4 py-2 text-xs text-[#777] transition-colors hover:text-white disabled:opacity-30"
                >
                  Previous
                </button>
                <button
                  disabled={sectionIndex === NAV_SECTIONS.length - 1}
                  onClick={() => setActiveSection(NAV_SECTIONS[sectionIndex + 1].id)}
                  className="flex items-center gap-1.5 rounded-xl border border-[#6366f140] bg-[#6366f115] px-4 py-2 text-xs font-medium text-[#a5b4fc] transition-colors hover:bg-[#6366f125] disabled:opacity-30"
                >
                  Next section <ArrowRight size={12} />
                </button>
              </div>
            </div>

            <aside className="hidden xl:block">
              <div className="sticky top-5 overflow-hidden rounded-2xl border border-[#1e1e1e] bg-[#0d0d0d]">
                <div className="border-b border-[#1a1a1a] px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <Sparkles size={13} className="text-[#818cf8]" />
                    <p className="text-xs font-semibold text-white">Timetable Summary</p>
                  </div>
                  <p className="mt-1 text-[10px] text-[#444]">Live configuration overview</p>
                </div>
                <div className="divide-y divide-[#151515] px-4">
                  {[
                    ['Working Days', `${activeDays.length} days`],
                    ['Periods / Day', `${prefs.numPeriods}`],
                    ['Total Weekly Slots', `${activeDays.length * prefs.numPeriods}`],
                    ['College Time', `${prefs.startTime} – ${prefs.endTime}`],
                    ['Lunch', lunch ? `${lunch.duration} minutes` : 'Disabled'],
                    ['Breaks', `${prefs.breaksEnabled ? prefs.breaks.length : 0}`],
                    ['Lab Duration', `${prefs.labConsecutivePeriods} periods`],
                    ['Constraints', `${hardCount} hard · ${softCount} soft`],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between py-3">
                      <span className="text-[10px] text-[#555]">{label}</span>
                      <span className="text-[11px] font-medium text-[#c7c7c7]">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="m-3 rounded-xl border border-[#6366f130] bg-[#6366f10d] p-3">
                  <p className="text-[10px] font-medium text-[#a5b4fc]">
                    {prefs.numPeriods} periods × {activeDays.length} days ={' '}
                    {prefs.numPeriods * activeDays.length} slots
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#1a1a1a]">
                    <div className="h-full w-3/4 rounded-full bg-[#6366f1]" />
                  </div>
                  <p className="mt-2 text-[9px] text-[#555]">
                    Core scheduling setup is ready for generation.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="flex flex-shrink-0 items-center justify-between border-t border-[#1a1a1a] bg-[#0a0a0a] px-4 py-3 sm:px-6 xl:px-8">
        <div className="flex items-center gap-2">
          {isDirty ? (
            <span className="flex items-center gap-1.5 text-[11px] text-[#f59e0b]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
              You have unsaved changes
            </span>
          ) : (
            <span className="text-[11px] text-[#333]">All changes saved</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPrefs(saved)}
            className="hidden px-3 py-1.5 text-xs text-[#555] transition-colors hover:text-[#a0a0a0] sm:block"
          >
            Cancel
          </button>
          <button
            onClick={() => setShowReset(true)}
            className="hidden rounded-xl border border-[#1a1a1a] bg-[#111] px-3 py-1.5 text-xs text-[#555] transition-all hover:border-[#2a2a2a] sm:block"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={!isDirty || saveState === 'saving'}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-[#6366f1] hover:bg-[#5558e8] disabled:opacity-40 rounded-xl transition-all"
          >
            <Save size={12} />
            Save Preferences
          </button>
        </div>
      </div>

      {/* Reset confirmation */}
      {showReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowReset(false)}
          />
          <div className="relative w-[360px] bg-[#161616] border border-[#262626] rounded-2xl shadow-2xl p-6 animate-slide-in-up">
            <div className="w-10 h-10 rounded-full bg-[#f59e0b15] border border-[#f59e0b30] flex items-center justify-center mb-4">
              <RotateCcw size={18} className="text-[#f59e0b]" />
            </div>
            <h2 className="text-sm font-semibold text-white mb-1">Reset to Defaults?</h2>
            <p className="text-xs text-[#555] mb-5">
              All preferences will be restored to their factory defaults. Any unsaved changes will
              be lost.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowReset(false)}
                className="flex-1 px-4 py-2 text-xs text-[#666] bg-[#1a1a1a] border border-[#1e1e1e] rounded-xl hover:bg-[#222] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-2 text-xs font-medium text-white bg-[#f59e0b] hover:bg-[#d97706] rounded-xl transition-colors"
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
