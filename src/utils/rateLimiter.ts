import { RateLimiterMemory } from 'rate-limiter-flexible';

export class ApiRateLimiter {
  private limiter: RateLimiterMemory;

  constructor(points: number, duration: number) {
    this.limiter = new RateLimiterMemory({
      points,      // Number of points
      duration,    // Per duration in seconds
    });
  }

  async consume(key: string): Promise<void> {
    try {
      await this.limiter.consume(key);
    } catch (error) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
  }

  async getPoints(key: string): Promise<number> {
    const res = await this.limiter.get(key);
    return res?.remainingPoints ?? 0;
  }
}