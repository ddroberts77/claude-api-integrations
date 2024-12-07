import { object, string, number, array, boolean } from 'yup';

// Common validation schemas
export const baseRequestSchema = object({
  apiKey: string().required('API key is required'),
  timestamp: number().default(() => Date.now())
});

// Firebase validation
export const firebaseConfigSchema = object({
  projectId: string().required('Project ID is required'),
  privateKey: string().required('Private key is required'),
  clientEmail: string().email().required('Client email is required'),
  databaseURL: string().url().required('Database URL is required')
});

// Job assistant validation
export const resumeSchema = object({
  content: string()
    .required('Resume content is required')
    .min(100, 'Resume is too short')
    .max(50000, 'Resume is too long'),
  format: string()
    .oneOf(['txt', 'pdf', 'doc', 'docx'])
    .default('txt')
});

export const jobDescriptionSchema = object({
  content: string()
    .required('Job description is required')
    .min(50, 'Job description is too short')
    .max(10000, 'Job description is too long'),
  requirements: array().of(string()).optional(),
  preferences: array().of(string()).optional()
});

// Response validation
export const apiResponseSchema = object({
  success: boolean().required(),
  data: object().optional(),
  error: string().when('success', {
    is: false,
    then: string().required('Error message is required when success is false')
  })
});

// Utility functions
export const validateInput = async (schema: any, data: any) => {
  try {
    await schema.validate(data, { abortEarly: false });
    return { isValid: true, errors: null };
  } catch (error) {
    return {
      isValid: false,
      errors: error.errors
    };
  }
};

export const sanitizeOutput = (data: any): any => {
  if (typeof data === 'string') {
    return data.replace(/[<>"'`]/g, '');
  }
  if (Array.isArray(data)) {
    return data.map(sanitizeOutput);
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