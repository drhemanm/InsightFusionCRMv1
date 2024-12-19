import { Contact } from '../contacts';
import { Deal } from '../deals';

export interface WorkflowEvent {
  id: string;
  type: 'contact_update' | 'deal_update' | 'task_update';
  entityId: string;
  changes: Record<string, any>;
  timestamp: Date;
  userId: string;
}

export interface Timeline {
  id: string;
  entityId: string;
  entityType: 'contact' | 'deal' | 'task';
  eventType: string;
  description: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface WorkflowTrigger {
  event: string;
  conditions: Record<string, any>;
  actions: WorkflowAction[];
}

export interface WorkflowAction {
  type: string;
  params: Record<string, any>;
}