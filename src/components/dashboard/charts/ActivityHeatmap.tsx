```typescript
import React from 'react';
import { Calendar, Download } from 'lucide-react';

interface HeatmapData {
  date: string;
  value: number;
}

const generateMockData = (): HeatmapData[] => {
  const data: HeatmapData[] = [];
  const now = new Date();
  for (let i = 0; i < 365; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.floor(Math.random() * 10)
    });
  }
  return data;
};

export const ActivityHeatmap: React.FC = () => {
  const data = generateMockData();
  const maxValue = Math.max(...data.map(d => d.value));

  const getColor = (value: number) => {
    const intensity = value / maxValue;
    return `rgba(59, 130, 246, ${intensity})`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Activity Heatmap</h2>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <Download size={20} />
        </button>
      </div>

      <div className="grid grid-cols-53 gap-1">
        {data.map((day, index) => (
          <div
            key={index}
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: getColor(day.value) }}
            title={`${day.date}: ${day.value} activities`}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <span>Less</span>
          <div className="flex gap-1">
            {[0.2, 0.4, 0.6, 0.8, 1].map((intensity) => (
              <div
                key={intensity}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: `rgba(59, 130, 246, ${intensity})` }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
```