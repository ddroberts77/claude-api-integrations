import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/error/custom-errors';
import { AnySchema } from 'yup';

export const validateSchema = (schema: AnySchema) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params
      }, {
        abortEarly: false,
        stripUnknown: true
      });
      next();
    } catch (error) {
      next(new ValidationError(error.errors.join(', ')));
    }
  };
};

export const validateApiKey = (apiKey: string): boolean => {
  // API key should be in format: cai_xxxxx
  const pattern = /^cai_[a-zA-Z0-9]{24}$/;
  return pattern.test(apiKey);
};

export const validateFirebaseConfig = (config: any): boolean => {
  const required = ['projectId', 'privateKey', 'clientEmail', 'databaseURL'];
  return required.every(field => {
    return config.hasOwnProperty(field) && config[field].length > 0;
  });
};

export const sanitizeOutput = (data: any): any => {
  if (typeof data === 'string') {
    return data.replace(/[<>"'`]/g, '');
  }
  if (Array.isArray(data)) {
    return data.map(item => sanitizeOutput(item));
  }
  if (typeof data === 'object' && data !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeOutput(value);
    }
    return sanitized;
  }
  return data;
};