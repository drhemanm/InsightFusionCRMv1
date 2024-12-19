import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { PipelineStage } from './components/PipelineStage';
import { DealDetails } from './components/DealDetails';
import { usePipelineStore } from './store/pipelineStore';
import { useAIInsights } from './hooks/useAIInsights';
import type { Deal, Stage } from './types';

export const PipelineManager: React.FC = () => {
  const { stages, deals, moveDeal } = usePipelineStore();
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const { insights, isLoading: loadingInsights } = useAIInsights(selectedDeal?.id);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { draggableId, source, destination } = result;
    moveDeal(draggableId, source.droppableId, destination.droppableId);
  };

  return (
    <div className="h-full flex">
      <div className="flex-1 overflow-x-auto">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-4 p-4">
            {stages.map((stage) => (
              <Droppable key={stage.id} droppableId={stage.id}>
                {(provided) => (
                  <PipelineStage
                    stage={stage}
                    deals={deals.filter(d => d.stageId === stage.id)}
                    onDealClick={setSelectedDeal}
                    provided={provided}
                  />
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>

      {selectedDeal && (
        <div className="w-96 border-l">
          <DealDetails
            deal={selectedDeal}
            insights={insights}
            isLoadingInsights={loadingInsights}
            onClose={() => setSelectedDeal(null)}
          />
        </div>
      )}
    </div>
  );
};