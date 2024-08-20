export class HttpError extends Error {
  statusCode: number;

  error: any;

  constructor(message: string, statusCode: number, error: any) {

    super(message);
    this.statusCode = statusCode;
    this.error = error;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden', error: any = {}) {
    super(message, 403, error);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Not Found', error: any = {}) {
    super(message, 404, error);
  }
}

export class BadRequestError extends HttpError {

  constructor(message = 'Bad Request', error: any = {}) {
    super(message, 400, error);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = 'Internal Server Error', error: any = {}) {
    super(message, 500, error);
  }
}
