import React from 'react';
import { Calendar } from 'lucide-react';

export interface TimeRange {
  value: '7d' | '30d' | '90d' | '1y';
  label: string;
}

interface TimeRangeFilterProps {
  value: TimeRange['value'];
  onChange: (value: TimeRange['value']) => void;
}

export const TimeRangeFilter: React.FC<TimeRangeFilterProps> = ({ value, onChange }) => {
  const timeRanges: TimeRange[] = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' }
  ];

  return (
    <div className="flex items-center gap-2">
      <Calendar className="text-gray-400" size={20} />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as TimeRange['value'])}
        className="px-3 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
      >
        {timeRanges.map(range => (
          <option key={range.value} value={range.value}>
            {range.label}
          </option>
        ))}
      </select>
    </div>
  );
};