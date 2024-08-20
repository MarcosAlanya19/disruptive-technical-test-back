import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/HttpError';

export function errorHandler(err: HttpError, req: Request, res: Response, next: NextFunction) {
  const statusCode = err.statusCode || 500;

  console.log({err})
  res.status(statusCode).json({
    success: false,
    message: err.message || 'An unexpected error occurred',
  });
}
