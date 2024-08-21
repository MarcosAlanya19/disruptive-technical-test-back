export class HttpError extends Error {
  public statusCode: number;
  public error?: any; 
  constructor(message: string, statusCode: number, error: any = {}) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;

    // Mantiene el nombre de la clase como Error y guarda el stack trace
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = 'Resource not found', error: any = {}) {
    super(message, 404, error);
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string = 'Bad request', error: any = {}) {
    super(message, 400, error);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string = 'Unauthorized', error: any = {}) {
    super(message, 401, error);
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string = 'Internal server error', error: any = {}) {
    super(message, 500, error);
  }
}
