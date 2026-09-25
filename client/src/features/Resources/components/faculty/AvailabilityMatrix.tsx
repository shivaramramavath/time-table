import { useState } from 'react';

type AvailabilityMatrixProps = {
  days: string[];
  periods: string[];
  value?: Record<string, boolean>;
  onChange?: (availability: Record<string, boolean>) => void;
};

const AvailabilityMatrix = ({ days, periods, value = {}, onChange }: AvailabilityMatrixProps) => {
  const [avail, setAvail] = useState<Record<string, boolean>>(value);

  const toggle = (key: string) => {
    setAvail((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      onChange?.(updated);
      return updated;
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="text-[10px]">
        <thead>
          <tr>
            <th className="w-14 pb-2 text-[#555] font-normal" />
            {days.map((day) => (
              <th key={day} className="w-10 pb-2 text-center text-[#555] font-medium">
                {day}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {periods.map((period) => (
            <tr key={period}>
              <td className="pr-2 py-0.5 text-[#555]">{period}</td>

              {days.map((day) => {
                const key = `${day}-${period}`;
                const isAvailable = avail[key] !== false;

                return (
                  <td key={day} className="py-0.5 text-center">
                    <button
                      type="button"
                      onClick={() => toggle(key)}
                      className="w-7 h-5 rounded transition-all cursor-pointer hover:bg-[#ef444420] hover:border-[#ef444430]"
                      style={{
                        background: isAvailable ? '#22c55e20' : '#ef444415',
                        border: `1px solid ${isAvailable ? '#22c55e40' : '#ef444430'}`,
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
};

export default AvailabilityMatrix;
