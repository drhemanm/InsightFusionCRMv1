import React, { useState } from 'react';
import { Flow } from 'reactflow';
import { TriggerNode } from './nodes/TriggerNode';
import { ActionNode } from './nodes/ActionNode';
import { ConditionNode } from './nodes/ConditionNode';
import { useWorkflowStore } from './store/workflowStore';
import { NodeLibrary } from './components/NodeLibrary';
import type { Workflow, WorkflowNode } from './types';

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
};

export const WorkflowBuilder: React.FC = () => {
  const { workflows, saveWorkflow } = useWorkflowStore();
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);

  return (
    <div className="h-full flex">
      <div className="w-64 border-r p-4">
        <NodeLibrary onNodeAdd={(type) => {
          // Add node to workflow
        }} />
      </div>

      <div className="flex-1">
        <Flow
          nodeTypes={nodeTypes}
          nodes={selectedWorkflow?.nodes || []}
          edges={selectedWorkflow?.edges || []}
          onNodesChange={() => {
            // Handle node changes
          }}
          onEdgesChange={() => {
            // Handle edge changes
          }}
          onConnect={() => {
            // Handle new connections
          }}
        />
      </div>
    </div>
  );
};