import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/error/custom-errors';
import logger from '../utils/logger';

export const validateRequest = (schema: any) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.validateSync({
        body: req.body,
        query: req.query,
        params: req.params
      }, { abortEarly: false });
      next();
    } catch (error) {
      next(new ValidationError(error.message));
    }
  };
};

export const logRequest = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  logger.info(`${req.method} ${req.path}`, {
    query: req.query,
    body: req.body,
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
};

export const notFound = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
};
