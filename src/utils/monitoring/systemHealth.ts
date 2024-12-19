import { logger } from './logger';
import { performanceMonitor } from './performance';

interface HealthMetrics {
  status: 'healthy' | 'degraded' | 'down';
  uptime: number;
  responseTime: number;
  errorRate: number;
  memoryUsage: number;
}

class SystemHealthMonitor {
  private static instance: SystemHealthMonitor;
  private startTime: number = Date.now();
  private errorCount: number = 0;
  private requestCount: number = 0;

  static getInstance(): SystemHealthMonitor {
    if (!SystemHealthMonitor.instance) {
      SystemHealthMonitor.instance = new SystemHealthMonitor();
    }
    return SystemHealthMonitor.instance;
  }

  async getHealthMetrics(): Promise<HealthMetrics> {
    const metrics = performanceMonitor.getMetrics();
    const uptime = Date.now() - this.startTime;
    const errorRate = this.requestCount ? (this.errorCount / this.requestCount) * 100 : 0;

    return {
      status: this.determineSystemStatus(errorRate),
      uptime,
      responseTime: metrics[metrics.length - 1]?.responseTime || 0,
      errorRate,
      memoryUsage: metrics[metrics.length - 1]?.memoryUsage || 0
    };
  }

  private determineSystemStatus(errorRate: number): HealthMetrics['status'] {
    if (errorRate > 10) return 'down';
    if (errorRate > 5) return 'degraded';
    return 'healthy';
  }

  recordError(): void {
    this.errorCount++;
    this.requestCount++;
  }

  recordRequest(): void {
    this.requestCount++;
  }
}

export const systemHealth = SystemHealthMonitor.getInstance();