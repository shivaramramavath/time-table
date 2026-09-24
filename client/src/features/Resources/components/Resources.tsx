import { useState } from 'react';
import {
  Search,
  Plus,
  Trash2,
  Edit2,
  X,
  Users,
  BookOpen,
  DoorOpen,
  FlaskConical,
  Upload,
  Download,
} from 'lucide-react';
import { mockFaculty, mockSubjects, mockRooms } from '../data/data.js';
import type { Faculty, Subject, Room } from '../data/types.js';

type ResourceTab = 'faculty' | 'subjects' | 'rooms' | 'labs';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const PERIODS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

function SubjectChip({ label, onRemove }: { label: string; onRemove?: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium bg-[#6366f115] text-[#a5b4fc] border border-[#6366f130] rounded-md">
      {label}
      {onRemove && (
        <button onClick={onRemove} className="hover:text-white">
          <X size={10} />
        </button>
      )}
    </span>
  );
}

function AvailabilityMatrix() {
  const [avail, setAvail] = useState<Record<string, boolean>>({});
  const toggle = (key: string) => setAvail((prev) => ({ ...prev, [key]: !prev[key] }));
  return (
    <div className="overflow-x-auto">
      <table className="text-[10px]">
        <thead>
          <tr>
            <th className="w-14 text-[#555] font-normal pb-2" />
            {DAYS.map((d) => (
              <th key={d} className="text-[#555] font-medium text-center w-10 pb-2">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PERIODS.map((period) => (
            <tr key={period}>
              <td className="pr-2 text-[#555] py-0.5">{period}</td>
              {DAYS.map((day) => {
                const key = `${day}-${period}`;
                const on = avail[key] !== false;
                return (
                  <td key={day} className="text-center py-0.5">
                    <button
                      onClick={() => toggle(key)}
                      className="w-7 h-5 rounded transition-all"
                      style={{
                        background: on ? '#22c55e20' : '#ef444415',
                        border: `1px solid ${on ? '#22c55e40' : '#ef444430'}`,
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FacultyModal({
  faculty,
  onClose,
  onSave,
}: {
  faculty: Faculty | null;
  onClose: () => void;
  onSave: (f: Faculty) => void;
}) {
  const [data, setData] = useState<Faculty>(
    faculty ?? {
      id: '',
      name: '',
      email: '',
      employeeId: '',
      department: 'Computer Science & Engineering',
      subjects: [],
      unavailablePeriods: 0,
      maxPerDay: 4,
      maxPerWeek: 20,
      status: 'active',
    },
  );
  const [newSubject, setNewSubject] = useState('');

  const addSubject = () => {
    if (!newSubject.trim()) return;
    setData((d) => ({ ...d, subjects: [...d.subjects, newSubject.trim()] }));
    setNewSubject('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-[540px] max-h-[90vh] bg-[#161616] border border-[#262626] rounded-xl shadow-2xl animate-slide-in-up overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#1e1e1e]">
          <div>
            <h2 className="text-sm font-semibold text-white">
              {faculty ? 'Edit Faculty' : 'Add Faculty'}
            </h2>
            <p className="text-xs text-[#555] mt-0.5">Update faculty information.</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-[#222] rounded-lg">
            <X size={15} className="text-[#555]" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs text-[#666] mb-1.5">Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
              placeholder="Full name"
            />
          </div>
          <div>
            <label className="block text-xs text-[#666] mb-1.5">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
              placeholder="email@domain.com"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#666] mb-1.5">Employee ID</label>
              <input
                type="text"
                value={data.employeeId}
                onChange={(e) => setData((d) => ({ ...d, employeeId: e.target.value }))}
                placeholder="EMP001"
              />
            </div>
            <div>
              <label className="block text-xs text-[#666] mb-1.5">Department</label>
              <input
                type="text"
                value={data.department}
                onChange={(e) => setData((d) => ({ ...d, department: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#666] mb-1.5">Subjects</label>
            <div className="min-h-10 p-2 bg-[#101010] border border-[#1e1e1e] rounded-lg flex flex-wrap gap-1.5 mb-2">
              {data.subjects.map((s) => (
                <SubjectChip
                  key={s}
                  label={s}
                  onRemove={() =>
                    setData((d) => ({ ...d, subjects: d.subjects.filter((x) => x !== s) }))
                  }
                />
              ))}
              <input
                type="text"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSubject()}
                placeholder="Add..."
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '12px',
                  color: 'var(--text-primary)',
                  minWidth: '60px',
                  flex: 1,
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#666] mb-1.5">Unavailable Periods</label>
            <input
              type="text"
              value={data.unavailablePeriods}
              onChange={(e) => setData((d) => ({ ...d, unavailablePeriods: +e.target.value }))}
            />
            <p className="text-[10px] text-[#444] mt-1">
              Number of periods when this faculty member cannot be scheduled.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#666] mb-1.5">Max Periods / Day</label>
              <input
                type="text"
                value={data.maxPerDay}
                onChange={(e) => setData((d) => ({ ...d, maxPerDay: +e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-xs text-[#666] mb-1.5">Max Periods / Week</label>
              <input
                type="text"
                value={data.maxPerWeek}
                onChange={(e) => setData((d) => ({ ...d, maxPerWeek: +e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#666] mb-2">Weekly Availability</label>
            <AvailabilityMatrix />
          </div>
        </div>

        <div className="flex gap-2 px-6 pb-5 pt-3 border-t border-[#1e1e1e]">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-xs text-[#666] bg-[#1a1a1a] hover:bg-[#222] border border-[#262626] rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({ ...data, id: data.id || `f${Date.now()}` })}
            className="flex-1 px-4 py-2 text-xs font-medium text-white bg-[#6366f1] hover:bg-[#5558e8] rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function FacultyRow({
  f,
  onEdit,
  onDelete,
}: {
  f: Faculty;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [menu, setMenu] = useState(false);
  return (
    <tr className="border-b border-[#111] hover:bg-[#0f0f0f] group/row transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-[10px] font-bold text-white shrink-0">
            {f.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div>
            <p className="text-xs font-medium text-white">{f.name}</p>
            <p className="text-[10px] text-[#555]">{f.email}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="text-xs text-[#666]">{f.employeeId}</span>
      </td>
      <td className="px-4 py-3">
        <span className="text-xs text-[#666] truncate max-w-[120px] block">{f.department}</span>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {f.subjects.slice(0, 2).map((s) => (
            <SubjectChip key={s} label={s} />
          ))}
          {f.subjects.length > 2 && (
            <span className="text-[10px] text-[#444]">+{f.subjects.length - 2}</span>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <span
          className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${f.status === 'active' ? 'text-[#22c55e] bg-[#22c55e15] border border-[#22c55e30]' : 'text-[#555] bg-[#161616] border border-[#1e1e1e]'}`}
        >
          {f.status === 'active' ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-1.5 hover:bg-[#1e1e1e] rounded-md transition-colors"
          >
            <Edit2 size={12} className="text-[#555]" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 hover:bg-[#ef444415] rounded-md transition-colors"
          >
            <Trash2 size={12} className="text-[#ef4444]" />
          </button>
        </div>
      </td>
    </tr>
  );
}

function SubjectRow({
  s,
  onEdit,
  onDelete,
}: {
  s: Subject;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <tr className="border-b border-[#111] hover:bg-[#0f0f0f] group/row transition-colors">
      <td className="px-4 py-3">
        <span className="text-xs font-mono text-[#a5b4fc]">{s.code}</span>
      </td>
      <td className="px-4 py-3">
        <span className="text-xs font-medium text-white">{s.name}</span>
      </td>
      <td className="px-4 py-3">
        <span
          className={`text-[10px] px-2 py-0.5 rounded-md border ${s.type === 'Lab' ? 'text-[#f97316] bg-[#f9731615] border-[#f9731630]' : 'text-[#a0a0a0] bg-[#161616] border-[#1e1e1e]'}`}
        >
          {s.type}
        </span>
      </td>
      <td className="px-4 py-3 text-center">
        <span className="text-xs text-[#666]">{s.credits}</span>
      </td>
      <td className="px-4 py-3 text-center">
        <span className="text-xs text-[#666]">{s.weeklyPeriods}</span>
      </td>
      <td className="px-4 py-3">
        <span className="text-xs text-[#555] truncate max-w-[140px] block">
          {s.faculty || <span className="text-[#ef4444]">Unassigned</span>}
        </span>
      </td>
      <td className="px-4 py-3">
        <span
          className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${s.status === 'Complete' ? 'text-[#22c55e] bg-[#22c55e15] border border-[#22c55e30]' : 'text-[#f59e0b] bg-[#f59e0b15] border border-[#f59e0b30]'}`}
        >
          {s.status}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
          <button onClick={onEdit} className="p-1.5 hover:bg-[#1e1e1e] rounded-md">
            <Edit2 size={12} className="text-[#555]" />
          </button>
          <button onClick={onDelete} className="p-1.5 hover:bg-[#ef444415] rounded-md">
            <Trash2 size={12} className="text-[#ef4444]" />
          </button>
        </div>
      </td>
    </tr>
  );
}

function RoomRow({ r, onDelete }: { r: Room; onDelete: () => void }) {
  return (
    <tr className="border-b border-[#111] hover:bg-[#0f0f0f] group/row transition-colors">
      <td className="px-4 py-3">
        <span className="text-xs font-medium text-white">{r.number}</span>
      </td>
      <td className="px-4 py-3">
        <span className="text-xs text-[#555]">{r.building}</span>
      </td>
      <td className="px-4 py-3 text-center">
        <span className="text-xs text-[#555]">{r.floor}</span>
      </td>
      <td className="px-4 py-3 text-center">
        <span className="text-xs text-[#666]">{r.capacity}</span>
      </td>
      <td className="px-4 py-3">
        <span
          className={`text-[10px] px-2 py-0.5 rounded-md border ${r.type === 'Lab' ? 'text-[#f97316] bg-[#f9731615] border-[#f9731630]' : r.type === 'Seminar Hall' ? 'text-[#8b5cf6] bg-[#8b5cf615] border-[#8b5cf630]' : 'text-[#a0a0a0] bg-[#161616] border-[#1e1e1e]'}`}
        >
          {r.type}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {r.equipment.slice(0, 2).map((eq) => (
            <span
              key={eq}
              className="text-[10px] px-1.5 py-0.5 bg-[#161616] border border-[#1e1e1e] text-[#555] rounded"
            >
              {eq}
            </span>
          ))}
          {r.equipment.length > 2 && (
            <span className="text-[10px] text-[#333]">+{r.equipment.length - 2}</span>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <span
          className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${r.status === 'available' ? 'text-[#22c55e] bg-[#22c55e15] border border-[#22c55e30]' : 'text-[#555] bg-[#161616] border border-[#1e1e1e]'}`}
        >
          {r.status === 'available' ? 'Available' : 'Unavailable'}
        </span>
      </td>
      <td className="px-4 py-3">
        <button
          onClick={onDelete}
          className="p-1.5 hover:bg-[#ef444415] rounded-md opacity-0 group-hover/row:opacity-100 transition-all"
        >
          <Trash2 size={12} className="text-[#ef4444]" />
        </button>
      </td>
    </tr>
  );
}

interface ResourcesProps {
  initialTab?: ResourceTab;
}

export default function Resources({ initialTab = 'faculty' }: ResourcesProps) {
  const [tab, setTab] = useState<ResourceTab>(initialTab);
  const [search, setSearch] = useState('');
  const [faculty, setFaculty] = useState(mockFaculty);
  const [subjects, setSubjects] = useState(mockSubjects);
  const [rooms, setRooms] = useState(mockRooms);
  const [editFaculty, setEditFaculty] = useState<Faculty | null | 'new'>(null);

  const TABS = [
    { id: 'faculty' as ResourceTab, label: 'Faculty', icon: Users, count: faculty.length },
    { id: 'subjects' as ResourceTab, label: 'Subjects', icon: BookOpen, count: subjects.length },
    { id: 'rooms' as ResourceTab, label: 'Rooms', icon: DoorOpen, count: rooms.length },
    { id: 'labs' as ResourceTab, label: 'Labs', icon: FlaskConical, count: 2 },
  ];

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-[#080808]">
      {/* Header */}
      <div className="px-8 pt-6 pb-0">
        <h1 className="text-base font-semibold text-white mb-4">Resources</h1>
        <div className="flex items-center gap-1 border-b border-[#1a1a1a]">
          {TABS.map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium border-b-2 transition-all -mb-px ${tab === id ? 'text-white border-[#6366f1]' : 'text-[#555] border-transparent hover:text-[#a0a0a0]'}`}
            >
              <Icon size={13} />
              {label}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ml-0.5 ${tab === id ? 'bg-[#6366f115] text-[#a5b4fc]' : 'bg-[#161616] text-[#444]'}`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-5">
        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${tab}...`}
              style={{ paddingLeft: '32px' }}
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs text-[#555] bg-[#161616] border border-[#1e1e1e] hover:border-[#2a2a2a] rounded-lg transition-colors">
            <Upload size={12} />
            Import
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs text-[#555] bg-[#161616] border border-[#1e1e1e] hover:border-[#2a2a2a] rounded-lg transition-colors">
            <Download size={12} />
            Export
          </button>
          <button
            onClick={() => {
              if (tab === 'faculty') setEditFaculty('new');
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-[#6366f1] hover:bg-[#5558e8] rounded-lg transition-colors ml-auto"
          >
            <Plus size={13} />
            Add {TABS.find((t) => t.id === tab)?.label.slice(0, -1)}
          </button>
        </div>

        {/* Tables */}
        {tab === 'faculty' && (
          <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a1a1a]">
                  {['Faculty', 'Employee ID', 'Department', 'Subjects', 'Status', ''].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[10px] font-semibold text-[#444] uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {faculty
                  .filter((f) => !search || f.name.toLowerCase().includes(search.toLowerCase()))
                  .map((f) => (
                    <FacultyRow
                      key={f.id}
                      f={f}
                      onEdit={() => setEditFaculty(f)}
                      onDelete={() => setFaculty((prev) => prev.filter((x) => x.id !== f.id))}
                    />
                  ))}
              </tbody>
            </table>
            {faculty.length === 0 && (
              <div className="py-16 text-center">
                <Users size={28} className="text-[#222] mx-auto mb-3" />
                <p className="text-sm text-[#333] mb-1">No faculty added yet</p>
                <p className="text-xs text-[#222]">Add faculty to assign instructors to subjects</p>
              </div>
            )}
          </div>
        )}

        {tab === 'subjects' && (
          <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a1a1a]">
                  {[
                    'Code',
                    'Subject',
                    'Type',
                    'Credits',
                    'Periods/Wk',
                    'Faculty',
                    'Status',
                    '',
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[10px] font-semibold text-[#444] uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subjects
                  .filter(
                    (s) =>
                      !search ||
                      s.name.toLowerCase().includes(search.toLowerCase()) ||
                      s.code.toLowerCase().includes(search.toLowerCase()),
                  )
                  .map((s) => (
                    <SubjectRow
                      key={s.id}
                      s={s}
                      onEdit={() => {}}
                      onDelete={() => setSubjects((prev) => prev.filter((x) => x.id !== s.id))}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'rooms' && (
          <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a1a1a]">
                  {['Room', 'Building', 'Floor', 'Capacity', 'Type', 'Equipment', 'Status', ''].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-[10px] font-semibold text-[#444] uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {rooms
                  .filter((r) => !search || r.number.toLowerCase().includes(search.toLowerCase()))
                  .map((r) => (
                    <RoomRow
                      key={r.id}
                      r={r}
                      onDelete={() => setRooms((prev) => prev.filter((x) => x.id !== r.id))}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'labs' && (
          <div className="py-16 text-center">
            <FlaskConical size={28} className="text-[#222] mx-auto mb-3" />
            <p className="text-sm text-[#333] mb-1">Lab rooms</p>
            <p className="text-xs text-[#222]">
              Labs are a subset of rooms — filter Rooms by type "Lab"
            </p>
          </div>
        )}
      </div>

      {/* Faculty modal */}
      {editFaculty !== null && (
        <FacultyModal
          faculty={editFaculty === 'new' ? null : editFaculty}
          onClose={() => setEditFaculty(null)}
          onSave={(f) => {
            setFaculty((prev) =>
              editFaculty === 'new' ? [f, ...prev] : prev.map((x) => (x.id === f.id ? f : x)),
            );
            setEditFaculty(null);
          }}
        />
      )}
    </div>
  );
}
