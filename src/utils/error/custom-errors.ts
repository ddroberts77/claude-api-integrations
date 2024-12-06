export class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class APIError extends BaseError {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

export class ValidationError extends APIError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class AuthenticationError extends APIError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class AuthorizationError extends APIError {
  constructor(message: string) {
    super(message, 403);
  }
}

export class NotFoundError extends APIError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class RateLimitError extends APIError {
  constructor(message: string) {
    super(message, 429);
  }
}