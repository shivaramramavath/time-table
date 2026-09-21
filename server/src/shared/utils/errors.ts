import ApiError from './ApiError.js';

export const errors = {
  badRequest: (message = 'Bad request') => new ApiError(400, message),

  unauthorized: (message = 'Unauthorized') => new ApiError(401, message),

  forbidden: (message = 'Forbidden') => new ApiError(403, message),

  notFound: (message = 'Resource not found') => new ApiError(404, message),

  conflict: (message = 'Resource already exists') => new ApiError(409, message),

  unprocessableEntity: (message = 'Unprocessable entity') => new ApiError(422, message),

  tooManyRequests: (message = 'Too many requests') => new ApiError(429, message),

  internal: (message = 'Internal server error') => new ApiError(500, message),
};
