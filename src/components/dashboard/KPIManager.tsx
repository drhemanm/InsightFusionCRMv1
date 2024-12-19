```typescript
import React, { useState } from 'react';
import { Target, Plus, Edit2, Trash2 } from 'lucide-react';

interface KPI {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  owner: string;
}

export const KPIManager: React.FC = () => {
  const [kpis, setKpis] = useState<KPI[]>([
    {
      id: '1',
      name: 'Revenue',
      target: 100000,
      current: 75000,
      unit: 'MUR',
      period: 'monthly',
      owner: 'Sales Team'
    },
    {
      id: '2',
      name: 'New Leads',
      target: 100,
      current: 65,
      unit: 'leads',
      period: 'monthly',
      owner: 'Marketing Team'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newKPI, setNewKPI] = useState<Partial<KPI>>({});

  const handleAddKPI = () => {
    if (!newKPI.name || !newKPI.target) return;

    setKpis([...kpis, {
      id: crypto.randomUUID(),
      name: newKPI.name,
      target: newKPI.target,
      current: 0,
      unit: newKPI.unit || '',
      period: newKPI.period || 'monthly',
      owner: newKPI.owner || ''
    }]);
    setShowAddForm(false);
    setNewKPI({});
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">KPI Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Add KPI
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={newKPI.name || ''}
                onChange={(e) => setNewKPI({ ...newKPI, name: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Target</label>
              <input
                type="number"
                value={newKPI.target || ''}
                onChange={(e) => setNewKPI({ ...newKPI, target: Number(e.target.value) })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleAddKPI}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Add KPI
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {kpis.map((kpi) => {
          const progress = (kpi.current / kpi.target) * 100;
          return (
            <div key={kpi.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className="text-blue-500" size={20} />
                  <h3 className="font-medium">{kpi.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-500">
                    <Edit2 size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  {kpi.current.toLocaleString()} / {kpi.target.toLocaleString()} {kpi.unit}
                </span>
                <span className="text-sm font-medium">
                  {Math.round(progress)}%
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    progress >= 100
                      ? 'bg-green-500'
                      : progress >= 75
                      ? 'bg-blue-500'
                      : progress >= 50
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                <span>{kpi.period}</span>
                <span>{kpi.owner}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
```