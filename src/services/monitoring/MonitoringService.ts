import { logger } from '../../utils/monitoring/logger';
import { performanceMonitor } from '../../utils/performance/PerformanceMonitor';
import { systemHealth } from '../../utils/monitoring/systemHealth';
import type { TimeRange } from '../../types/monitoring';

class MonitoringService {
  private static instance: MonitoringService;
  private alertSubscribers: ((alert: any) => void)[] = [];
  private readonly ALERT_THRESHOLDS = {
    errorRate: 5, // 5% error rate
    responseTime: 1000, // 1 second
    memoryUsage: 90, // 90% usage
    cpuUsage: 80 // 80% usage
  };

  private constructor() {
    this.initializeMonitoring();
  }

  static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  private initializeMonitoring(): void {
    // Check system health every minute
    setInterval(() => this.checkSystemHealth(), 60000);

    // Monitor performance metrics every 5 seconds
    setInterval(() => this.checkPerformanceMetrics(), 5000);

    // Clean up old metrics every hour
    setInterval(() => this.cleanupOldMetrics(), 3600000);
  }

  private async checkSystemHealth(): Promise<void> {
    try {
      const health = await systemHealth.getHealthMetrics();
      
      if (health.status !== 'healthy') {
        this.triggerAlert({
          type: 'system_health',
          severity: health.status === 'down' ? 'critical' : 'warning',
          message: `System health is ${health.status}`,
          metrics: health
        });
      }

      logger.info('System health check completed', health);
    } catch (error) {
      logger.error('System health check failed', { error });
    }
  }

  private async checkPerformanceMetrics(): Promise<void> {
    const metrics = performanceMonitor.getMetrics();
    const latest = metrics[metrics.length - 1];

    if (!latest) return;

    // Check error rate
    if (latest.errorCount / latest.requestCount * 100 > this.ALERT_THRESHOLDS.errorRate) {
      this.triggerAlert({
        type: 'error_rate',
        severity: 'critical',
        message: 'High error rate detected',
        metrics: { errorRate: latest.errorCount / latest.requestCount * 100 }
      });
    }

    // Check response time
    if (latest.responseTime > this.ALERT_THRESHOLDS.responseTime) {
      this.triggerAlert({
        type: 'response_time',
        severity: 'warning',
        message: 'High response time detected',
        metrics: { responseTime: latest.responseTime }
      });
    }

    // Check memory usage
    if (latest.memoryUsage > this.ALERT_THRESHOLDS.memoryUsage) {
      this.triggerAlert({
        type: 'memory_usage',
        severity: 'warning',
        message: 'High memory usage detected',
        metrics: { memoryUsage: latest.memoryUsage }
      });
    }
  }

  private cleanupOldMetrics(): void {
    // Keep last 24 hours of metrics
    const cutoff = Date.now() - (24 * 60 * 60 * 1000);
    performanceMonitor.getMetrics().filter(metric => 
      metric.timestamp > cutoff
    );
  }

  subscribeToAlerts(callback: (alert: any) => void): void {
    this.alertSubscribers.push(callback);
  }

  private triggerAlert(alert: any): void {
    logger.warn('Alert triggered', alert);
    this.alertSubscribers.forEach(subscriber => subscriber(alert));
  }

  async getMetrics(timeRange: TimeRange = '24h'): Promise<any> {
    const metrics = performanceMonitor.getMetrics();
    const health = await systemHealth.getHealthMetrics();

    return {
      health,
      performance: metrics,
      summary: performanceMonitor.getAverageMetrics()
    };
  }

  async getErrorReport(timeRange: TimeRange = '24h'): Promise<any> {
    const logs = logger.getLogs('error');
    return {
      totalErrors: logs.length,
      topErrors: this.aggregateErrors(logs),
      errorRate: this.calculateErrorRate(logs)
    };
  }

  private aggregateErrors(logs: any[]): any[] {
    const errorCounts = new Map<string, number>();
    
    logs.forEach(log => {
      const errorKey = log.message;
      errorCounts.set(errorKey, (errorCounts.get(errorKey) || 0) + 1);
    });

    return Array.from(errorCounts.entries())
      .map(([message, count]) => ({ message, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  private calculateErrorRate(logs: any[]): number {
    const totalRequests = performanceMonitor.getMetrics()
      .reduce((sum, metric) => sum + metric.requestCount, 0);
    
    return totalRequests ? (logs.length / totalRequests) * 100 : 0;
  }
}

export const monitoringService = MonitoringService.getInstance();