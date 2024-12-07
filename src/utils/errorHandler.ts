export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true,
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const handleError = (error: Error | ApiError) => {
  if (error instanceof ApiError && error.isOperational) {
    // Handle operational errors
    console.error('Operational error:', error);
  } else {
    // Handle programming or other unhandled errors
    console.error('An unexpected error occurred:', error);
    // You might want to do some cleanup or recovery here
  }
};

export const errorTypes = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  RATE_LIMIT: 429,
  INTERNAL_SERVER: 500,
};