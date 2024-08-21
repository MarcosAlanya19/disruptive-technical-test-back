"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.UnauthorizedError = exports.BadRequestError = exports.NotFoundError = exports.HttpError = void 0;
class HttpError extends Error {
    constructor(message, statusCode, error = {}) {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
        // Mantiene el nombre de la clase como Error y guarda el stack trace
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}
exports.HttpError = HttpError;
class NotFoundError extends HttpError {
    constructor(message = 'Resource not found', error = {}) {
        super(message, 404, error);
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends HttpError {
    constructor(message = 'Bad request', error = {}) {
        super(message, 400, error);
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends HttpError {
    constructor(message = 'Unauthorized', error = {}) {
        super(message, 401, error);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class InternalServerError extends HttpError {
    constructor(message = 'Internal server error', error = {}) {
        super(message, 500, error);
    }
}
exports.InternalServerError = InternalServerError;
