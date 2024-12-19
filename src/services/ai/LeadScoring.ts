import { AI_CONFIG } from '../../config/ai';
import type { LeadScore, LeadData } from '../../types/ai';

export class LeadScoringService {
  private model: any;
  private lastUpdate: Date;

  async scoreLeads(leads: LeadData[]): Promise<LeadScore[]> {
    if (this.shouldUpdateModel()) {
      await this.updateModel();
    }

    return Promise.all(
      leads.map(async (lead) => {
        const features = this.extractFeatures(lead);
        const score = await this.predictScore(features);
        
        return {
          leadId: lead.id,
          score,
          factors: this.getContributingFactors(features, score),
          timestamp: new Date()
        };
      })
    );
  }

  private async updateModel(): Promise<void> {
    try {
      // Update model weights
      this.lastUpdate = new Date();
    } catch (error) {
      console.error('Failed to update lead scoring model:', error);
      throw error;
    }
  }

  private shouldUpdateModel(): boolean {
    if (!this.lastUpdate) return true;
    
    const timeSinceUpdate = Date.now() - this.lastUpdate.getTime();
    return timeSinceUpdate > AI_CONFIG.models.leadScoring.updateInterval * 1000;
  }

  private extractFeatures(lead: LeadData): any {
    return {
      interactions: lead.interactions.length,
      lastInteraction: this.getTimeSinceLastInteraction(lead),
      // Add more features
    };
  }

  private async predictScore(features: any): Promise<number> {
    // Implement prediction logic
    return 0.85; // Mock score
  }

  private getContributingFactors(features: any, score: number): string[] {
    // Analyze which features contributed most to the score
    return ['High engagement', 'Recent interaction'];
  }

  private getTimeSinceLastInteraction(lead: LeadData): number {
    const lastInteraction = lead.interactions[lead.interactions.length - 1];
    return Date.now() - new Date(lastInteraction.timestamp).getTime();
  }
}

export const leadScoringService = new LeadScoringService();