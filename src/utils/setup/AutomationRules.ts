export interface WorkflowTrigger {
  event: string;
  conditions: Record<string, any>;
  actions: WorkflowAction[];
}

export interface WorkflowAction {
  type: string;
  params: Record<string, any>;
}

export class AutomationRules {
  static getDefaultTriggers(): WorkflowTrigger[] {
    return [
      {
        event: 'lead_created',
        conditions: { source: 'web_form' },
        actions: [
          {
            type: 'assign_owner',
            params: { method: 'round_robin' }
          },
          {
            type: 'send_email',
            params: { template: 'welcome_email' }
          }
        ]
      },
      {
        event: 'deal_stage_changed',
        conditions: { new_stage: 'proposal' },
        actions: [
          {
            type: 'create_task',
            params: { template: 'send_proposal' }
          },
          {
            type: 'notify_manager',
            params: { message: 'New deal entered proposal stage' }
          }
        ]
      }
    ];
  }

  static getTaskAutomations() {
    return {
      follow_up: {
        trigger: 'deal_no_activity',
        conditions: { days: 7 },
        action: 'create_follow_up_task'
      },
      meeting_reminder: {
        trigger: 'meeting_scheduled',
        conditions: { minutes_before: 15 },
        action: 'send_notification'
      }
    };
  }

  static getEmailAutomations() {
    return {
      nurture_sequence: {
        triggers: ['lead_created', 'website_visit'],
        delay: { days: 2 },
        template: 'nurture_email_1'
      },
      proposal_reminder: {
        triggers: ['proposal_sent'],
        delay: { days: 3 },
        template: 'proposal_follow_up'
      }
    };
  }
}