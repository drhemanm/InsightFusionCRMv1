import { GAMIFICATION_CONFIG } from '../../config/gamification';
import type { LeaderboardEntry, LeaderboardCategory } from '../../types/gamification';

export class LeaderboardManager {
  private leaderboards: Map<LeaderboardCategory, LeaderboardEntry[]>;
  private lastUpdate: Date;

  constructor() {
    this.leaderboards = new Map();
    this.initializeLeaderboards();
  }

  private initializeLeaderboards(): void {
    GAMIFICATION_CONFIG.leaderboards.categories.forEach(category => {
      this.leaderboards.set(category, []);
    });
  }

  async getLeaderboard(
    category: LeaderboardCategory
  ): Promise<LeaderboardEntry[]> {
    if (this.shouldRefreshLeaderboard()) {
      await this.refreshLeaderboards();
    }

    return this.leaderboards.get(category) || [];
  }

  async updateScore(
    userId: string,
    points: number,
    category: LeaderboardCategory
  ): Promise<void> {
    const leaderboard = this.leaderboards.get(category) || [];
    const userEntry = leaderboard.find(entry => entry.userId === userId);

    if (userEntry) {
      userEntry.points += points;
      userEntry.lastUpdated = new Date();
    } else {
      leaderboard.push({
        userId,
        points,
        rank: leaderboard.length + 1,
        lastUpdated: new Date()
      });
    }

    // Sort and update ranks
    this.sortAndUpdateRanks(category);
  }

  private async refreshLeaderboards(): Promise<void> {
    try {
      // Fetch latest scores from database
      this.lastUpdate = new Date();
    } catch (error) {
      console.error('Failed to refresh leaderboards:', error);
      throw error;
    }
  }

  private shouldRefreshLeaderboard(): boolean {
    if (!this.lastUpdate) return true;
    
    const timeSinceUpdate = Date.now() - this.lastUpdate.getTime();
    return timeSinceUpdate > GAMIFICATION_CONFIG.leaderboards.refreshInterval * 1000;
  }

  private sortAndUpdateRanks(category: LeaderboardCategory): void {
    const leaderboard = this.leaderboards.get(category) || [];
    
    leaderboard.sort((a, b) => b.points - a.points);
    
    leaderboard.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    // Trim to display limit
    if (leaderboard.length > GAMIFICATION_CONFIG.leaderboards.displayLimit) {
      leaderboard.length = GAMIFICATION_CONFIG.leaderboards.displayLimit;
    }

    this.leaderboards.set(category, leaderboard);
  }
}

export const leaderboardManager = new LeaderboardManager();