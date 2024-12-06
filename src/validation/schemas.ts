import { object, string, number, array } from 'yup';

export const apiRequestSchema = object({
  body: object({
    prompt: string().required('Prompt is required').max(4000),
    maxTokens: number().min(1).max(100000).default(2048),
    temperature: number().min(0).max(1).default(0.7),
    options: object().optional()
  })
});

export const firebaseConfigSchema = object({
  projectId: string().required(),
  privateKey: string().required(),
  clientEmail: string().email().required(),
  databaseURL: string().url().required()
});

export const jobAnalysisSchema = object({
  body: object({
    resume: string().required('Resume content is required')
      .min(50, 'Resume content is too short')
      .max(50000, 'Resume content is too long'),
    jobDescription: string()
      .min(50, 'Job description is too short')
      .max(5000, 'Job description is too long')
      .optional(),
    options: object({
      detailed: boolean().default(false),
      format: string().oneOf(['text', 'html', 'markdown']).default('text'),
      highlights: number().min(1).max(10).default(5)
    }).optional()
  })
});

export const userSchema = object({
  body: object({
    email: string().email().required('Email is required'),
    apiKey: string().required('API key is required'),
    preferences: object({
      notifications: boolean().default(true),
      language: string().default('en'),
      timezone: string()
    }).optional()
  })
});