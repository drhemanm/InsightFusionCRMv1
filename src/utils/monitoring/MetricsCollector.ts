import { logger } from './logger';
import { performanceMonitor } from '../performance/PerformanceMonitor';

interface MetricPoint {
  timestamp: number;
  value: number;
  tags?: Record<string, string>;
}

class MetricsCollector {
  private static instance: MetricsCollector;
  private metrics: Map<string, MetricPoint[]> = new Map();
  private readonly RETENTION_PERIOD = 7 * 24 * 60 * 60 * 1000; // 7 days

  private constructor() {
    this.startCleanup();
  }

  static getInstance(): MetricsCollector {
    if (!MetricsCollector.instance) {
      MetricsCollector.instance = new MetricsCollector();
    }
    return MetricsCollector.instance;
  }

  recordMetric(name: string, value: number, tags?: Record<string, string>): void {
    const points = this.metrics.get(name) || [];
    points.push({
      timestamp: Date.now(),
      value,
      tags
    });
    this.metrics.set(name, points);

    // Check thresholds
    this.checkThresholds(name, value);
  }

  private checkThresholds(name: string, value: number): void {
    const thresholds: Record<string, number> = {
      response_time: 1000, // 1 second
      error_rate: 5, // 5%
      memory_usage: 90 // 90%
    };

    if (thresholds[name] && value > thresholds[name]) {
      logger.warn(`Metric ${name} exceeded threshold`, {
        value,
        threshold: thresholds[name]
      });
    }
  }

  getMetrics(name: string, timeRange?: { start: Date; end: Date }): MetricPoint[] {
    const points = this.metrics.get(name) || [];
    
    if (!timeRange) return points;

    return points.filter(point => 
      point.timestamp >= timeRange.start.getTime() &&
      point.timestamp <= timeRange.end.getTime()
    );
  }

  private startCleanup(): void {
    setInterval(() => {
      const cutoff = Date.now() - this.RETENTION_PERIOD;
      
      for (const [name, points] of this.metrics.entries()) {
        const filtered = points.filter(point => point.timestamp > cutoff);
        this.metrics.set(name, filtered);
      }
    }, 3600000); // Clean up every hour
  }
}

export const metricsCollector = MetricsCollector.getInstance();