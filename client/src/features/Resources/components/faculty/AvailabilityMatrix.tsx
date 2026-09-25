import { useState } from 'react';

const AvailabilityMatrix = () => {
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const PERIODS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

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
};

export default AvailabilityMatrix;
