import * as tf from '@tensorflow/tfjs';
import Sentiment from 'sentiment';
import type {
  TeamMember,
  CollaborationRecommendation,
  EmailAnalysis,
  SalesCoachingSuggestion,
  DealInsights
} from '../types/ai';

const sentiment = new Sentiment();

class AIService {
  private model: tf.LayersModel | null = null;

  async init() {
    try {
      // Load pre-trained model (in production, this would be a real model)
      this.model = await tf.loadLayersModel('/models/sales-prediction.json');
    } catch (error) {
      console.error('Failed to load AI model:', error);
    }
  }

  async getCollaborationRecommendations(
    projectRequirements: string[],
    teamMembers: TeamMember[]
  ): Promise<CollaborationRecommendation[]> {
    return teamMembers.map(member => {
      const skillMatch = member.skills.filter(skill => 
        projectRequirements.includes(skill)
      ).length;

      const workloadScore = 1 - member.currentWorkload;
      const availabilityScore = member.availability;

      const pastSuccessScore = member.pastCollaborations.reduce(
        (acc, collab) => acc + collab.success,
        0
      ) / Math.max(1, member.pastCollaborations.length);

      const totalScore = (
        skillMatch * 0.4 +
        workloadScore * 0.2 +
        availabilityScore * 0.2 +
        pastSuccessScore * 0.2
      );

      return {
        teamMemberId: member.id,
        score: totalScore,
        reasons: this.generateRecommendationReasons(member, projectRequirements),
        skills: member.skills.filter(skill => projectRequirements.includes(skill))
      };
    }).sort((a, b) => b.score - a.score);
  }

  private generateRecommendationReasons(
    member: TeamMember,
    requirements: string[]
  ): string[] {
    const reasons: string[] = [];

    const matchingSkills = member.skills.filter(skill => 
      requirements.includes(skill)
    );

    if (matchingSkills.length > 0) {
      reasons.push(`Has ${matchingSkills.length} relevant skills: ${matchingSkills.join(', ')}`);
    }

    if (member.availability > 0.7) {
      reasons.push('High availability for new projects');
    }

    if (member.currentWorkload < 0.5) {
      reasons.push('Has capacity to take on new work');
    }

    const successfulCollabs = member.pastCollaborations.filter(c => c.success > 0.7);
    if (successfulCollabs.length > 0) {
      reasons.push(`Successfully completed ${successfulCollabs.length} similar projects`);
    }

    return reasons;
  }

  async analyzeEmail(content: string): Promise<EmailAnalysis> {
    const sentimentResult = sentiment.analyze(content);
    const words = content.toLowerCase().split(/\s+/);
    
    const keyTopics = this.extractKeyTopics(words);

    const suggestedResponses = await this.generateResponseSuggestions(
      content,
      sentimentResult.score
    );

    return {
      sentiment: {
        score: sentimentResult.score,
        comparative: sentimentResult.comparative,
        tokens: words,
        positive: sentimentResult.positive,
        negative: sentimentResult.negative
      },
      suggestedResponses,
      tone: this.determineTone(sentimentResult.score),
      keyTopics
    };
  }

  private determineTone(sentimentScore: number): 'positive' | 'neutral' | 'negative' {
    if (sentimentScore > 0) return 'positive';
    if (sentimentScore < 0) return 'negative';
    return 'neutral';
  }

  private extractKeyTopics(words: string[]): string[] {
    const wordFreq = new Map<string, number>();
    
    words.forEach(word => {
      if (word.length > 3) { // Skip short words
        wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
      }
    });

    return Array.from(wordFreq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word);
  }

  private async generateResponseSuggestions(
    content: string,
    sentiment: number
  ): Promise<string[]> {
    // In a real implementation, this would use a language model
    const tone = this.determineTone(sentiment);
    
    const templates = {
      positive: [
        "Thank you for your positive feedback! We're glad to hear...",
        "We appreciate your enthusiasm and support...",
      ],
      neutral: [
        "Thank you for reaching out. Let me help you with...",
        "I understand your request and will look into...",
      ],
      negative: [
        "I apologize for any inconvenience. Let me address your concerns...",
        "I understand your frustration, and I want to help resolve...",
      ]
    };

    return templates[tone];
  }

  async getSalesCoachingSuggestions(
    dealId: string,
    dealData: any
  ): Promise<SalesCoachingSuggestion[]> {
    if (!this.model) {
      throw new Error('AI model not initialized');
    }

    const suggestions: SalesCoachingSuggestion[] = [];

    // Analyze deal stage and history
    if (this.shouldSuggestFollowUp(dealData)) {
      suggestions.push({
        type: 'follow_up',
        priority: 'high',
        suggestion: 'Schedule a follow-up meeting',
        reasoning: 'No contact in the last 7 days',
        nextSteps: [
          'Review last conversation notes',
          'Prepare agenda for next meeting',
          'Send calendar invite'
        ]
      });
    }

    // Analyze deal value and probability
    if (this.shouldSuggestStrategy(dealData)) {
      suggestions.push({
        type: 'deal_strategy',
        priority: 'medium',
        suggestion: 'Consider value-based pricing strategy',
        reasoning: 'Similar deals closed at higher values',
        nextSteps: [
          'Review competitor pricing',
          'Identify unique value propositions',
          'Prepare ROI calculation'
        ]
      });
    }

    return suggestions;
  }

  private shouldSuggestFollowUp(dealData: any): boolean {
    const lastContact = new Date(dealData.lastContactDate);
    const daysSinceContact = Math.floor(
      (Date.now() - lastContact.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysSinceContact > 7;
  }

  private shouldSuggestStrategy(dealData: any): boolean {
    return dealData.probability < 0.5 && dealData.value > 10000;
  }

  async analyzeDealInsights(dealId: string): Promise<DealInsights> {
    if (!this.model) {
      throw new Error('AI model not initialized');
    }

    // In a real implementation, this would use the loaded TensorFlow model
    return {
      winProbability: 0.75,
      riskFactors: [
        'Long sales cycle',
        'Multiple stakeholders',
        'Budget constraints'
      ],
      suggestedActions: [
        {
          type: 'risk_mitigation',
          priority: 'high',
          suggestion: 'Engage additional stakeholders',
          reasoning: 'Decision-making process involves multiple departments',
          nextSteps: [
            'Identify key stakeholders',
            'Schedule individual meetings',
            'Prepare personalized value propositions'
          ]
        }
      ],
      similarDeals: [
        {
          id: 'deal-123',
          outcome: 'won',
          learnings: [
            'Early executive sponsorship was crucial',
            'ROI demonstration accelerated decision'
          ]
        }
      ]
    };
  }
}

export const aiService = new AIService();