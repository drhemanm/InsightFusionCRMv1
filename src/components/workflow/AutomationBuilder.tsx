import React, { useState } from 'react';
import { Plus, Save, Play, Settings } from 'lucide-react';
import { TriggerSelector } from './triggers/TriggerSelector';
import { ActionBuilder } from './actions/ActionBuilder';
import { ConditionBuilder } from './conditions/ConditionBuilder';
import { workflowAnalyzer } from '../../services/workflowAnalyzer';
import type { WorkflowAction, WorkflowTrigger } from '../../types/workflow';

export const AutomationBuilder: React.FC = () => {
  const [workflow, setWorkflow] = useState<{
    trigger: WorkflowTrigger | null;
    conditions: Record<string, any>[];
    actions: WorkflowAction[];
  }>({
    trigger: null,
    conditions: [],
    actions: []
  });

  // ... rest of the component implementation ...
};