export const GAMIFICATION_CONFIG = {
  points: {
    taskCompletion: 10,
    dealClosed: 100,
    leadConverted: 50,
    dailyLogin: 5
  },
  levels: [
    { name: 'Rookie', threshold: 0 },
    { name: 'Professional', threshold: 1000 },
    { name: 'Expert', threshold: 5000 },
    { name: 'Master', threshold: 10000 }
  ],
  achievements: {
    categories: ['sales', 'engagement', 'teamwork', 'learning'],
    updateInterval: 300, // 5 minutes
    notificationDelay: 2000 // 2 seconds
  },
  leaderboards: {
    refreshInterval: 900, // 15 minutes
    displayLimit: 10,
    categories: ['daily', 'weekly', 'monthly', 'all-time']
  }
};