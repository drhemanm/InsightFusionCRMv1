import { Timeline, WorkflowEvent, WorkflowTrigger } from '../../types/workflow';
import { logger } from '../../utils/monitoring/logger';

class WorkflowManager {
  private static instance: WorkflowManager;
  private triggers: Map<string, WorkflowTrigger[]> = new Map();
  private timeline: Timeline[] = [];

  private constructor() {
    this.initializeDefaultTriggers();
  }

  static getInstance(): WorkflowManager {
    if (!WorkflowManager.instance) {
      WorkflowManager.instance = new WorkflowManager();
    }
    return WorkflowManager.instance;
  }

  private initializeDefaultTriggers(): void {
    // Contact update triggers deal and task updates
    this.registerTrigger('contact_update', {
      event: 'contact_update',
      conditions: {},
      actions: [
        {
          type: 'update_related_deals',
          params: { updateType: 'contact_info' }
        },
        {
          type: 'create_task',
          params: { type: 'follow_up' }
        }
      ]
    });

    // Deal stage change triggers tasks and notifications
    this.registerTrigger('deal_update', {
      event: 'deal_stage_change',
      conditions: {},
      actions: [
        {
          type: 'create_task',
          params: { type: 'stage_action' }
        },
        {
          type: 'send_notification',
          params: { type: 'deal_stage_change' }
        }
      ]
    });
  }

  registerTrigger(event: string, trigger: WorkflowTrigger): void {
    const eventTriggers = this.triggers.get(event) || [];
    eventTriggers.push(trigger);
    this.triggers.set(event, eventTriggers);
  }

  async handleEvent(event: WorkflowEvent): Promise<void> {
    try {
      const eventTriggers = this.triggers.get(event.type) || [];
      
      for (const trigger of eventTriggers) {
        if (this.evaluateConditions(trigger.conditions, event)) {
          await this.executeActions(trigger.actions, event);
        }
      }

      this.addToTimeline({
        id: crypto.randomUUID(),
        entityId: event.entityId,
        entityType: event.type.split('_')[0] as any,
        eventType: event.type,
        description: this.generateEventDescription(event),
        timestamp: event.timestamp,
        metadata: event.changes
      });

    } catch (error) {
      logger.error('Workflow event handling failed', { error, event });
    }
  }

  private evaluateConditions(conditions: Record<string, any>, event: WorkflowEvent): boolean {
    // Implement condition evaluation logic
    return true;
  }

  private async executeActions(actions: WorkflowAction[], event: WorkflowEvent): Promise<void> {
    for (const action of actions) {
      try {
        await this.executeAction(action, event);
      } catch (error) {
        logger.error('Action execution failed', { error, action, event });
      }
    }
  }

  private async executeAction(action: WorkflowAction, event: WorkflowEvent): Promise<void> {
    // Implement action execution logic
  }

  private addToTimeline(entry: Timeline): void {
    this.timeline.push(entry);
  }

  getTimeline(entityId: string): Timeline[] {
    return this.timeline
      .filter(entry => entry.entityId === entityId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  private generateEventDescription(event: WorkflowEvent): string {
    // Generate human-readable description based on event type and changes
    return `${event.type.replace('_', ' ')} occurred`;
  }
}

export const workflowManager = WorkflowManager.getInstance();