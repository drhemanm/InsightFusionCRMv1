export const AI_CONFIG = {
  models: {
    sentiment: {
      endpoint: '/api/ai/sentiment',
      threshold: 0.7,
      batchSize: 32
    },
    leadScoring: {
      endpoint: '/api/ai/scoring',
      updateInterval: 3600, // 1 hour
      minDataPoints: 100
    },
    forecasting: {
      endpoint: '/api/ai/forecast',
      timeframe: {
        min: 7, // days
        max: 90 // days
      }
    }
  },
  features: {
    realtime: true,
    batchProcessing: true,
    autoRetry: true
  },
  limits: {
    requestsPerMinute: 100,
    modelSize: '1GB',
    cacheTimeout: 300 // 5 minutes
  }
};