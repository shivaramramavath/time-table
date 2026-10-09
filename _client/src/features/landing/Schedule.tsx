import { useState } from 'react';
import { AlertCircle, CheckCircle2, Download, Share2, Printer, Eye } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TIMES = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

const mockScheduleBlocks = [
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

type ViewMode = 'weekly' | 'faculty' | 'room';

const SECTIONS = ['CSE-A', 'CSE-B', 'CSE-C'];

function ScheduleBlock({ block }: { block: (typeof mockScheduleBlocks)[0] }) {
  return (
    <div
      className="absolute inset-0.5 rounded-lg px-1.5 py-1 overflow-hidden cursor-pointer hover:brightness-110 transition-all group/block"
      style={{ background: `${block.color}20`, border: `1px solid ${block.color}40` }}
    >
      <p className="text-[10px] font-semibold leading-tight" style={{ color: block.color }}>
        {block.subject}
      </p>
      <p className="text-[9px] text-[#555] truncate mt-0.5">
        {block.faculty.split(' ').slice(-1)[0]}
      </p>
      <p className="text-[9px] text-[#444] truncate">{block.room}</p>
    </div>
  );
}

export default function Schedule() {
  const [view, setView] = useState<ViewMode>('weekly');
  const [section, setSection] = useState('CSE-A');
  const [showConflicts, setShowConflicts] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [published, setPublished] = useState(false);

  const blocksByCell: Record<string, (typeof mockScheduleBlocks)[0] | undefined> = {};
  mockScheduleBlocks.forEach((b) => {
    blocksByCell[`${b.day}-${b.period}`] = b;
  });

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-[#080808]">


      {/* Grid */}
      <div className="flex-1 overflow-auto px-6 py-5">
        <div className="min-w-max">
          <div className="flex">
            <div className="w-16 shrink-0" />
            {DAYS.map((day) => (
              <div
                key={day}
                className="flex-1 min-w-[120px] text-center py-2 text-xs font-medium text-[#555]"
              >
                {day}
              </div>
            ))}
          </div>

          {TIMES.map((time, periodIdx) => (
            <div key={time} className="flex border-t border-[#111]">
              <div className="w-16 shrink-0 py-3 text-[10px] text-[#333] text-right pr-3 pt-2">
                {time}
              </div>
              {DAYS.map((day) => {
                const block = blocksByCell[`${day}-${periodIdx}`];
                return (
                  <div
                    key={day}
                    className="flex-1 min-w-[120px] border-l border-[#111] relative"
                    style={{ height: '64px' }}
                  >
                    {block && <ScheduleBlock block={block} />}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Conflicts panel */}
      {showConflicts && (
        <div className="border-t border-[#1a1a1a] px-6 py-4 bg-[#0d0d0d]">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-white">2 Warnings</p>
            <button
              onClick={() => setShowConflicts(false)}
              className="text-[10px] text-[#555] hover:text-[#a0a0a0]"
            >
              Dismiss
            </button>
          </div>
          <div className="space-y-2">
            {[
              {
                msg: 'Faculty workload preference: Prof. Ravi Kumar has 5 consecutive classes on Tuesday',
                type: 'warning',
              },
              {
                msg: 'Soft constraint: CS506 (SE) scheduled in first period — consider moving',
                type: 'warning',
              },
            ].map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-3 py-2 bg-[#f59e0b10] border border-[#f59e0b20] rounded-lg"
              >
                <AlertCircle size={12} className="text-[#f59e0b] shrink-0" />
                <p className="text-xs text-[#a0a0a0] flex-1">{c.msg}</p>
                <button className="text-[10px] text-[#6366f1] hover:underline shrink-0">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Publish modal */}
      {showPublish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPublish(false)}
          />
          <div className="relative w-[440px] bg-[#161616] border border-[#262626] rounded-xl shadow-2xl animate-slide-in-up p-6">
            <h2 className="text-base font-semibold text-white mb-1">Ready to Publish?</h2>
            <p className="text-xs text-[#555] mb-5">
              Review the readiness summary before publishing.
            </p>
            <div className="space-y-2 mb-5">
              {[
                'Institution',
                'Programs',
                'Academic Years',
                'Sections',
                'Subjects',
                'Faculty',
                'Rooms',
                'Constraints',
              ].map((item, i) => (
                <div
                  key={item}
                  className="flex items-center justify-between py-1.5 border-b border-[#111]"
                >
                  <span className="text-xs text-[#666]">{item}</span>
                  <CheckCircle2 size={13} className="text-[#22c55e]" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 mb-5">
              {[
                { l: 'Classes', v: '160' },
                { l: 'Faculty', v: '18' },
                { l: 'Rooms', v: '12' },
              ].map(({ l, v }) => (
                <div
                  key={l}
                  className="bg-[#1a1a1a] border border-[#1e1e1e] rounded-lg p-2.5 text-center"
                >
                  <p className="text-sm font-semibold text-white">{v}</p>
                  <p className="text-[10px] text-[#555]">{l}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#f59e0b10] border border-[#f59e0b20] rounded-lg px-3 py-2 mb-5">
              <p className="text-xs text-[#f59e0b]">⚠ 2 soft constraint warnings — non-blocking</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPublish(false)}
                className="flex-1 px-4 py-2 text-xs text-[#666] bg-[#1a1a1a] border border-[#1e1e1e] rounded-lg hover:bg-[#222] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setPublished(true);
                  setShowPublish(false);
                }}
                className="flex-1 px-4 py-2 text-xs font-medium text-white bg-[#6366f1] hover:bg-[#5558e8] rounded-lg transition-colors"
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
