import { DataValidator } from './DataValidator';
import { DataCleaner } from './DataCleaner';
import { DuplicateDetector } from './DuplicateDetector';
import { logger } from '../monitoring/logger';
import { performanceMonitor } from '../performance/PerformanceMonitor';
import { CacheManager } from '../cache/CacheManager';

export class DataQualityManager {
  private static instance: DataQualityManager;
  private cache: CacheManager<any>;

  private constructor() {
    this.cache = new CacheManager({
      maxSize: 1000,
      ttl: 300 // 5 minutes
    });
  }

  static getInstance(): DataQualityManager {
    if (!DataQualityManager.instance) {
      DataQualityManager.instance = new DataQualityManager();
    }
    return DataQualityManager.instance;
  }

  async processData<T>(data: T, type: string): Promise<T> {
    const startTime = performance.now();

    try {
      // Check cache first
      const cacheKey = this.generateCacheKey(data, type);
      const cached = this.cache.get(cacheKey);
      if (cached) {
        return cached;
      }

      // Validate data
      const validated = await DataValidator.validateContact(data);

      // Clean data
      const cleaned = DataCleaner.cleanContactData(validated);

      // Check for duplicates
      const duplicates = await DuplicateDetector.findDuplicateContacts(
        cleaned,
        [] // Pass existing contacts
      );

      if (duplicates.length > 0) {
        logger.warn('Duplicates found', { 
          count: duplicates.length,
          data: cleaned 
        });
      }

      // Cache result
      this.cache.set(cacheKey, cleaned);

      const duration = performance.now() - startTime;
      performanceMonitor.recordMetric('data_processing', duration);

      return cleaned;
    } catch (error) {
      logger.error('Data processing failed', { error, data });
      throw error;
    }
  }

  private generateCacheKey(data: any, type: string): string {
    return `${type}_${JSON.stringify(data)}`;
  }
}

export const dataQualityManager = DataQualityManager.getInstance();