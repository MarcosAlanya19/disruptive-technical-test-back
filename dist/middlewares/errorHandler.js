"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const HttpError_1 = require("../errors/HttpError");
function errorHandler(err, req, res, next) {
    if (err instanceof HttpError_1.HttpError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            statusCode: err.statusCode,
            error: err.error, // Responde con la propiedad `error` si está presente
        });
    }
    else {
        res.status(500).json({
            statussuccess: false,
            message: 'Internal Server Error',
            statusCode: 500,
        });
    }
}
