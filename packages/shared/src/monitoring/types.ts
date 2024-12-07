export type MetricTypes = 'request' | 'error' | 'latency';

export interface Metrics {
  requests: number;
  errors: number;
  latency: number[];
  rateLimit: {
    current: number;
    limit: number;
    resetTime: number;
  };
}

export interface ErrorReport {
  type: string;
  message: string;
  stack?: string;
  metadata?: Record<string, any>;
}

export interface HealthCheck {
  status: 'healthy' | 'unhealthy';
  timestamp: number;
  metrics: {
    errorRate: number;
    avgLatency: number;
    requestCount: number;
  };
}