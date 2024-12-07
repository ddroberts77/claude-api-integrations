import NodeCache from 'node-cache';
import { logger } from '../utils/logger';

export class CacheManager {
  private static instance: CacheManager;
  private cache: NodeCache;

  private constructor() {
    this.cache = new NodeCache({
      stdTTL: 3600, // 1 hour default TTL
      checkperiod: 600 // Check for expired keys every 10 minutes
    });

    this.cache.on('expired', (key, value) => {
      logger.debug(`Cache key expired: ${key}`);
    });
  }

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = this.cache.get<T>(key);
      return value || null;
    } catch (error) {
      logger.error('Cache get error:', error);
      return null;
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<boolean> {
    try {
      return this.cache.set(key, value, ttl);
    } catch (error) {
      logger.error('Cache set error:', error);
      return false;
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      return this.cache.del(key) > 0;
    } catch (error) {
      logger.error('Cache delete error:', error);
      return false;
    }
  }

  async flush(): Promise<void> {
    try {
      this.cache.flushAll();
    } catch (error) {
      logger.error('Cache flush error:', error);
    }
  }

  getStats() {
    return this.cache.getStats();
  }
}