import { logger } from '../monitoring/logger';

interface PerformanceMetrics {
  timestamp: number;
  responseTime: number;
  memoryUsage: number;
  cpuUsage?: number;
  errorCount: number;
  requestCount: number;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics[] = [];
  private readonly MAX_METRICS = 1000;
  private readonly ALERT_THRESHOLDS = {
    responseTime: 1000, // 1 second
    errorRate: 5, // 5%
    memoryUsage: 0.9 // 90%
  };

  private constructor() {
    this.startMonitoring();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private startMonitoring(): void {
    setInterval(() => {
      this.collectMetrics();
    }, 60000); // Every minute
  }

  private async collectMetrics(): Promise<void> {
    const metrics: PerformanceMetrics = {
      timestamp: Date.now(),
      responseTime: performance.now(),
      memoryUsage: this.getMemoryUsage(),
      errorCount: 0,
      requestCount: 0
    };

    this.metrics.push(metrics);

    // Keep only recent metrics
    if (this.metrics.length > this.MAX_METRICS) {
      this.metrics.shift();
    }

    // Check thresholds
    this.checkThresholds(metrics);
  }

  private getMemoryUsage(): number {
    if (performance.memory) {
      return performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit;
    }
    return 0;
  }

  private checkThresholds(metrics: PerformanceMetrics): void {
    // Check response time
    if (metrics.responseTime > this.ALERT_THRESHOLDS.responseTime) {
      logger.warn('High response time detected', {
        value: metrics.responseTime,
        threshold: this.ALERT_THRESHOLDS.responseTime
      });
    }

    // Check error rate
    if (metrics.requestCount > 0) {
      const errorRate = (metrics.errorCount / metrics.requestCount) * 100;
      if (errorRate > this.ALERT_THRESHOLDS.errorRate) {
        logger.warn('High error rate detected', {
          value: errorRate,
          threshold: this.ALERT_THRESHOLDS.errorRate
        });
      }
    }

    // Check memory usage
    if (metrics.memoryUsage > this.ALERT_THRESHOLDS.memoryUsage) {
      logger.warn('High memory usage detected', {
        value: metrics.memoryUsage,
        threshold: this.ALERT_THRESHOLDS.memoryUsage
      });
    }
  }

  recordError(): void {
    const currentMetrics = this.getCurrentMetrics();
    if (currentMetrics) {
      currentMetrics.errorCount++;
    }
  }

  recordRequest(): void {
    const currentMetrics = this.getCurrentMetrics();
    if (currentMetrics) {
      currentMetrics.requestCount++;
    }
  }

  private getCurrentMetrics(): PerformanceMetrics | undefined {
    return this.metrics[this.metrics.length - 1];
  }

  getMetrics(timeRange?: { start: Date; end: Date }): PerformanceMetrics[] {
    if (!timeRange) return this.metrics;

    return this.metrics.filter(metric => 
      metric.timestamp >= timeRange.start.getTime() &&
      metric.timestamp <= timeRange.end.getTime()
    );
  }

  getAverageMetrics(timeRange?: { start: Date; end: Date }): {
    avgResponseTime: number;
    avgErrorRate: number;
    avgMemoryUsage: number;
  } {
    const relevantMetrics = this.getMetrics(timeRange);
    const total = relevantMetrics.length;

    if (total === 0) return {
      avgResponseTime: 0,
      avgErrorRate: 0,
      avgMemoryUsage: 0
    };

    const sum = relevantMetrics.reduce((acc, metric) => ({
      responseTime: acc.responseTime + metric.responseTime,
      errorRate: acc.errorRate + (metric.errorCount / metric.requestCount || 0) * 100,
      memoryUsage: acc.memoryUsage + metric.memoryUsage
    }), { responseTime: 0, errorRate: 0, memoryUsage: 0 });

    return {
      avgResponseTime: sum.responseTime / total,
      avgErrorRate: sum.errorRate / total,
      avgMemoryUsage: sum.memoryUsage / total
    };
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();