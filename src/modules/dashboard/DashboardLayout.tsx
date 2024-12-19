import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { WidgetGrid } from './components/WidgetGrid';
import { WidgetLibrary } from './components/WidgetLibrary';
import { useWidgetStore } from './store/widgetStore';
import type { Widget } from './types';

export const DashboardLayout: React.FC = () => {
  const { widgets, updateLayout } = useWidgetStore();
  const [isCustomizing, setIsCustomizing] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={() => setIsCustomizing(!isCustomizing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            {isCustomizing ? 'Save Layout' : 'Customize Dashboard'}
          </button>
        </div>

        {isCustomizing && <WidgetLibrary />}
        
        <WidgetGrid
          widgets={widgets}
          isCustomizing={isCustomizing}
          onLayoutChange={updateLayout}
        />
      </div>
    </DndProvider>
  );
};