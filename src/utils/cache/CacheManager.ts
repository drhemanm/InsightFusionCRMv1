import { logger } from '../monitoring/logger';

interface CacheConfig {
  maxSize: number;
  ttl: number; // Time to live in seconds
}

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class CacheManager<T> {
  private cache: Map<string, CacheEntry<T>> = new Map();
  private readonly config: CacheConfig;

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = {
      maxSize: config.maxSize || 1000,
      ttl: config.ttl || 300 // 5 minutes default
    };

    // Start cleanup interval
    setInterval(() => this.cleanup(), 60000); // Cleanup every minute
  }

  set(key: string, value: T, ttl?: number): void {
    // Enforce cache size limit
    if (this.cache.size >= this.config.maxSize) {
      this.evictOldest();
    }

    this.cache.set(key, {
      value,
      expiresAt: Date.now() + (ttl || this.config.ttl) * 1000
    });

    logger.debug('Cache entry set', { key, ttl });
  }

  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    
    if (!entry) return undefined;

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.value;
  }

  private evictOldest(): void {
    const oldestKey = Array.from(this.cache.keys())[0];
    if (oldestKey) {
      this.cache.delete(oldestKey);
      logger.debug('Cache entry evicted', { key: oldestKey });
    }
  }

  private cleanup(): void {
    const now = Date.now();
    let evictedCount = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
        evictedCount++;
      }
    }

    if (evictedCount > 0) {
      logger.debug('Cache cleanup completed', { evictedCount });
    }
  }

  clear(): void {
    this.cache.clear();
    logger.debug('Cache cleared');
  }

  getStats(): { size: number; maxSize: number } {
    return {
      size: this.cache.size,
      maxSize: this.config.maxSize
    };
  }
}