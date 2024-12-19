```typescript
import { logger } from '../utils/logger';
import { performanceMonitor } from '../utils/performance';
import { rateLimiter } from '../utils/security/rateLimiter';

export abstract class BaseService {
  protected async executeWithMetrics<T>(
    operation: string,
    func: () => Promise<T>
  ): Promise<T> {
    const startTime = performance.now();

    try {
      // Check rate limiting
      if (rateLimiter.isRateLimited(operation)) {
        throw new Error('Rate limit exceeded');
      }

      // Execute operation
      const result = await func();

      // Record metrics
      const duration = performance.now() - startTime;
      performanceMonitor.recordMetric(operation, duration);

      return result;
    } catch (error) {
      logger.error(`Error in ${operation}`, { error });
      throw error;
    }
  }

  protected handleError(error: unknown, context: string): never {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error(`Error in ${context}`, { error: errorMessage });
    throw new Error(`${context}: ${errorMessage}`);
  }
}
```