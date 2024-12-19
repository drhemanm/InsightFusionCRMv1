export interface PipelineStage {
  id: string;
  name: string;
  probability: number;
  actions: string[];
  requiredFields: string[];
}

export class SalesProcess {
  static getDefaultPipeline(): PipelineStage[] {
    return [
      {
        id: 'lead',
        name: 'New Lead',
        probability: 10,
        actions: ['qualify_lead', 'assign_owner'],
        requiredFields: ['company', 'email'],
      },
      {
        id: 'qualified',
        name: 'Qualified',
        probability: 25,
        actions: ['schedule_meeting', 'send_materials'],
        requiredFields: ['budget', 'timeline'],
      },
      {
        id: 'proposal',
        name: 'Proposal',
        probability: 50,
        actions: ['create_quote', 'send_proposal'],
        requiredFields: ['quote_amount', 'products'],
      },
      {
        id: 'negotiation',
        name: 'Negotiation',
        probability: 75,
        actions: ['update_quote', 'schedule_review'],
        requiredFields: ['final_amount', 'close_date'],
      },
      {
        id: 'closed_won',
        name: 'Closed Won',
        probability: 100,
        actions: ['create_contract', 'schedule_onboarding'],
        requiredFields: ['contract_value', 'start_date'],
      },
    ];
  }

  static getLeadRoutingRules() {
    return {
      territory: {
        type: 'geographic',
        field: 'country',
        assignments: {
          'US': ['team_a'],
          'UK': ['team_b'],
          '*': ['team_c'],
        },
      },
      product: {
        type: 'round_robin',
        groups: {
          'enterprise': ['sales_team_1'],
          'smb': ['sales_team_2'],
        },
      },
    };
  }

  static getEmailTemplates() {
    return {
      lead_welcome: {
        subject: 'Welcome to {{company_name}}',
        body: 'Hi {{contact_name}},\n\nThank you for your interest...',
      },
      meeting_request: {
        subject: 'Follow-up Meeting Request',
        body: 'Hi {{contact_name}},\n\nI would like to schedule...',
      },
      proposal_follow_up: {
        subject: 'Following up on our proposal',
        body: 'Hi {{contact_name}},\n\nI wanted to follow up...',
      },
    };
  }
}