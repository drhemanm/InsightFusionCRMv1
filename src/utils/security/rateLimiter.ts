import { logger } from '../monitoring/logger';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

class RateLimiter {
  private static instance: RateLimiter;
  private limits: Map<string, RateLimitEntry> = new Map();
  private readonly defaultConfig: RateLimitConfig = {
    windowMs: 60000, // 1 minute
    maxRequests: 100
  };

  private constructor() {
    // Clean up expired entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  static getInstance(): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter();
    }
    return RateLimiter.instance;
  }

  isRateLimited(key: string, config: Partial<RateLimitConfig> = {}): boolean {
    const { windowMs, maxRequests } = { ...this.defaultConfig, ...config };
    const now = Date.now();
    const entry = this.limits.get(key);

    if (!entry || now > entry.resetAt) {
      this.limits.set(key, {
        count: 1,
        resetAt: now + windowMs
      });
      return false;
    }

    entry.count++;
    if (entry.count > maxRequests) {
      logger.warn('Rate limit exceeded', { key, count: entry.count });
      return true;
    }

    return false;
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.limits.entries()) {
      if (now > entry.resetAt) {
        this.limits.delete(key);
      }
    }
  }

  reset(key: string): void {
    this.limits.delete(key);
  }
}

export const rateLimiter = RateLimiter.getInstance();