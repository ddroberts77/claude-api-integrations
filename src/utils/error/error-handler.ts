import { Request, Response, NextFunction } from 'express';
import { APIError } from './custom-errors';
import logger from '../logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error('Error:', {
    name: err.name,
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  if (err instanceof APIError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      code: err.statusCode,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
    return;
  }

  // Handle unknown errors
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction): Promise<void> => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};