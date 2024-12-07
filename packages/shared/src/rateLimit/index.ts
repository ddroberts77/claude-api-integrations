import { RateLimiter } from './types';
import { logger } from '../utils/logger';

export class RateLimitManager implements RateLimiter {
  private static instance: RateLimitManager;
  private limits: Map<string, {
    count: number;
    resetTime: number;
  }>;

  private constructor() {
    this.limits = new Map();
  }

  static getInstance(): RateLimitManager {
    if (!RateLimitManager.instance) {
      RateLimitManager.instance = new RateLimitManager();
    }
    return RateLimitManager.instance;
  }

  async checkLimit(key: string, limit: number, windowMs: number): Promise<boolean> {
    const now = Date.now();
    const userLimit = this.limits.get(key);

    if (!userLimit || now > userLimit.resetTime) {
      this.limits.set(key, {
        count: 1,
        resetTime: now + windowMs
      });
      return true;
    }

    if (userLimit.count >= limit) {
      logger.warn(`Rate limit exceeded for key: ${key}`);
      return false;
    }

    userLimit.count++;
    return true;
  }

  async resetLimit(key: string): Promise<void> {
    this.limits.delete(key);
  }

  getLimitStatus(key: string): {
    remaining: number;
    resetTime: number;
  } | null {
    const limit = this.limits.get(key);
    if (!limit) return null;

    return {
      remaining: Math.max(0, 100 - limit.count), // Assuming 100 is max limit
      resetTime: limit.resetTime
    };
  }

  cleanup(): void {
    const now = Date.now();
    for (const [key, limit] of this.limits.entries()) {
      if (now > limit.resetTime) {
        this.limits.delete(key);
      }
    }
  }
}