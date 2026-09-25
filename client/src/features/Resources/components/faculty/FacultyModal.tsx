import React, { useState } from 'react';
import type { Faculty } from '../../data/types';

const FacultyModal = () => {
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

  const removeSubject = (subject: string) => {
    setData((d) => ({ ...d, subjects: d.subjects.filter((s) => s !== subject) }));
  };

  const onClose = () => {};
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
};

export default FacultyModal;
