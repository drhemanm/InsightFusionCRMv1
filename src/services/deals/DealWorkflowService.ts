import { logger } from '../../utils/monitoring/logger';
import { notificationService } from '../notification/NotificationService';
import { dealAssignmentService } from './DealAssignmentService';
import type { Deal } from '../../types/deals';

class DealWorkflowService {
  private static instance: DealWorkflowService;

  private constructor() {}

  static getInstance(): DealWorkflowService {
    if (!DealWorkflowService.instance) {
      DealWorkflowService.instance = new DealWorkflowService();
    }
    return DealWorkflowService.instance;
  }

  async processDealCreation(deal: Deal): Promise<void> {
    try {
      // 1. Deal Assignment
      const assigneeId = await dealAssignmentService.assignDeal(deal);
      
      // 2. Send Notifications
      await this.sendNotifications(deal, assigneeId);
      
      // 3. Create Initial Tasks
      await this.createInitialTasks(deal, assigneeId);
      
      // 4. Place in Pipeline
      await this.placeDealInPipeline(deal);

      logger.info('Deal workflow completed', { dealId: deal.id });
    } catch (error) {
      logger.error('Deal workflow failed', { error, dealId: deal.id });
      throw error;
    }
  }

  private async sendNotifications(deal: Deal, assigneeId: string): Promise<void> {
    // Notify assigned sales rep
    await notificationService.send({
      userId: assigneeId,
      type: 'deal_assigned',
      title: 'New Deal Assigned',
      message: `You have been assigned a new deal: ${deal.title}`,
      data: { dealId: deal.id }
    });

    // Notify managers for high-value deals
    if (deal.value >= 100000) {
      await notificationService.send({
        userId: 'manager',
        type: 'high_value_deal',
        title: 'High-Value Deal Created',
        message: `A new high-value deal (${deal.title}) has been created`,
        data: { dealId: deal.id, value: deal.value }
      });
    }
  }

  private async createInitialTasks(deal: Deal, assigneeId: string): Promise<void> {
    const tasks = [
      {
        title: 'Initial Contact',
        description: 'Make first contact with the prospect',
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        priority: 'high',
        assignedTo: assigneeId
      },
      {
        title: 'Needs Assessment',
        description: 'Conduct needs assessment call',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        priority: 'medium',
        assignedTo: assigneeId
      }
    ];

    // Implementation would create tasks
    logger.info('Initial tasks created', { dealId: deal.id, taskCount: tasks.length });
  }

  private async placeDealInPipeline(deal: Deal): Promise<void> {
    // Set initial pipeline stage
    const initialStage = 'prospecting';
    
    // Implementation would update deal stage
    logger.info('Deal placed in pipeline', { 
      dealId: deal.id, 
      stage: initialStage 
    });
  }
}

export const dealWorkflowService = DealWorkflowService.getInstance();