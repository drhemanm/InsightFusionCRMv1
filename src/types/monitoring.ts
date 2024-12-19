export type TimeRange = '1h' | '24h' | '7d' | '30d' | 'custom';

export interface KPIMetrics {
  activeSubscribers: number;
  subscriberGrowth: number;
  growthRate: number;
  growthRateChange: number;
  churnRate: number;
  churnRateChange: number;
  apiRequests: number;
  apiRequestsChange: number;
}

export interface APIMetrics {
  totalRequests: number;
  avgResponseTime: number;
  errorRate: number;
  timeseries: Array<{
    timestamp: string;
    requestCount: number;
    responseTime: number;
    errorRate: number;
  }>;
}

export interface ResourceMetrics {
  cpuUsage: number;
  memoryUsage: number;
  bandwidthUsage: number;
  alerts: Array<{
    severity: 'warning' | 'critical';
    message: string;
    timestamp: string;
  }>;
}

export interface DatabaseMetrics {
  avgQueryTime: number;
  queryTimeChange: number;
  activeConnections: number;
  connectionPoolUsage: number;
  failedQueries: number;
  failedQueryRate: number;
  slowQueries: Array<{
    query: string;
    executionTime: number;
    count: number;
  }>;
}