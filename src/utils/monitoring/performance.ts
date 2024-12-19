```typescript
import { logger } from './logger';

interface PerformanceMetrics {
  responseTime: number;
  memoryUsage: number;
  cpuUsage?: number;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics[] = [];
  private readonly ALERT_THRESHOLD = 1000; // 1 second

  private constructor() {
    this.startMonitoring();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private startMonitoring() {
    setInterval(() => {
      this.collectMetrics();
    }, 60000); // Collect metrics every minute
  }

  private async collectMetrics() {
    const metrics: PerformanceMetrics = {
      responseTime: performance.now(),
      memoryUsage: window.performance?.memory?.usedJSHeapSize || 0,
    };

    this.metrics.push(metrics);

    // Alert if response time is above threshold
    if (metrics.responseTime > this.ALERT_THRESHOLD) {
      logger.warn('High response time detected', {
        responseTime: metrics.responseTime,
        threshold: this.ALERT_THRESHOLD
      });
    }
  }

  getMetrics(): PerformanceMetrics[] {
    return this.metrics;
  }

  clearMetrics(): void {
    this.metrics = [];
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();
```