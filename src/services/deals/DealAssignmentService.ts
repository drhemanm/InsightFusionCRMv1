import { logger } from '../../utils/monitoring/logger';
import type { Deal } from '../../types/deals';

interface AssignmentRule {
  type: 'region' | 'value' | 'availability';
  condition: (deal: Deal) => boolean;
  assigneeId: string;
}

class DealAssignmentService {
  private static instance: DealAssignmentService;
  private rules: AssignmentRule[] = [];

  private constructor() {
    this.initializeDefaultRules();
  }

  static getInstance(): DealAssignmentService {
    if (!DealAssignmentService.instance) {
      DealAssignmentService.instance = new DealAssignmentService();
    }
    return DealAssignmentService.instance;
  }

  private initializeDefaultRules() {
    // Example rules - in production, these would be loaded from configuration
    this.rules = [
      {
        type: 'value',
        condition: (deal) => deal.value >= 100000,
        assigneeId: 'senior-rep'
      },
      {
        type: 'region',
        condition: (deal) => deal.region === 'north',
        assigneeId: 'north-team-lead'
      }
    ];
  }

  async assignDeal(deal: Deal): Promise<string> {
    try {
      // Check automatic assignment rules
      for (const rule of this.rules) {
        if (rule.condition(deal)) {
          logger.info('Deal automatically assigned', {
            dealId: deal.id,
            assigneeId: rule.assigneeId,
            ruleType: rule.type
          });
          return rule.assigneeId;
        }
      }

      // If no automatic rules match, mark for manual assignment
      logger.info('Deal marked for manual assignment', { dealId: deal.id });
      return 'pending_assignment';
    } catch (error) {
      logger.error('Deal assignment failed', { error, dealId: deal.id });
      throw error;
    }
  }

  async addAssignmentRule(rule: AssignmentRule): Promise<void> {
    this.rules.push(rule);
    logger.info('Assignment rule added', { ruleType: rule.type });
  }
}

export const dealAssignmentService = DealAssignmentService.getInstance();