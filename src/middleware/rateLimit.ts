import { ApiRateLimiter } from '../utils/rateLimiter';
import { ApiError } from '../utils/errorHandler';

const globalLimiter = new ApiRateLimiter(100, 60); // 100 requests per minute

export const rateLimitMiddleware = async (req: any, res: any, next: any) => {
  try {
    const key = req.ip; // Use IP address as key
    await globalLimiter.consume(key);
    next();
  } catch (error) {
    next(new ApiError(429, 'Too many requests'));
  }
};

export const getRemainingPoints = async (ip: string): Promise<number> => {
  return await globalLimiter.getPoints(ip);
};