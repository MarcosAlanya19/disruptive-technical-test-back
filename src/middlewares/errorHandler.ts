import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/HttpError';

export function errorHandler(
  err: HttpError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      statusCode: err.statusCode,
      error: err.error, // Responde con la propiedad `error` si está presente
    });
  } else {
    res.status(500).json({
      statussuccess: false,
      message: 'Internal Server Error',
      statusCode: 500,
    });
  }
}
