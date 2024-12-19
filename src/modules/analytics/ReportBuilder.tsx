import React, { useState } from 'react';
import { ChartBuilder } from './components/ChartBuilder';
import { FilterBuilder } from './components/FilterBuilder';
import { useReportStore } from './store/reportStore';
import type { Report, ChartConfig, FilterConfig } from './types';

export const ReportBuilder: React.FC = () => {
  const { reports, saveReport } = useReportStore();
  const [activeReport, setActiveReport] = useState<Report | null>(null);
  const [chartConfig, setChartConfig] = useState<ChartConfig | null>(null);
  const [filterConfig, setFilterConfig] = useState<FilterConfig | null>(null);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Report Builder</h1>
        <button
          onClick={() => saveReport({ chartConfig, filterConfig })}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Save Report
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <ChartBuilder
            config={chartConfig}
            onChange={setChartConfig}
          />
        </div>
        <div>
          <FilterBuilder
            config={filterConfig}
            onChange={setFilterConfig}
          />
        </div>
      </div>
    </div>
  );
};