import { Metrics, MetricTypes, ErrorReport } from './types';
import { logger } from '../utils/logger';

export class MonitoringService {
  private static instance: MonitoringService;
  private metrics: Metrics = {
    requests: 0,
    errors: 0,
    latency: [],
    rateLimit: {
      current: 0,
      limit: 100,
      resetTime: Date.now() + 3600000
    }
  };

  private constructor() {}

  static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  trackMetric(type: MetricTypes, value: number): void {
    switch(type) {
      case 'request':
        this.metrics.requests++;
        break;
      case 'error':
        this.metrics.errors++;
        break;
      case 'latency':
        this.metrics.latency.push(value);
        if (this.metrics.latency.length > 1000) {
          this.metrics.latency.shift();
        }
        break;
    }
  }

  reportError(error: ErrorReport): void {
    logger.error('Application error:', {
      type: error.type,
      message: error.message,
      stack: error.stack,
      metadata: error.metadata
    });

    this.trackMetric('error', 1);
  }

  checkHealth(): boolean {
    const errorRate = this.metrics.errors / this.metrics.requests;
    const avgLatency = this.metrics.latency.reduce((a, b) => a + b, 0) / this.metrics.latency.length;

    return errorRate < 0.05 && avgLatency < 1000;
  }

  getRateLimitStatus(): {
    remaining: number;
    resetTime: number;
  } {
    return {
      remaining: this.metrics.rateLimit.limit - this.metrics.rateLimit.current,
      resetTime: this.metrics.rateLimit.resetTime
    };
  }

  resetMetrics(): void {
    this.metrics = {
      requests: 0,
      errors: 0,
      latency: [],
      rateLimit: {
        current: 0,
        limit: 100,
        resetTime: Date.now() + 3600000
      }
    };
  }
}