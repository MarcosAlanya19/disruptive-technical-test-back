"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRequired = void 0;
const jwt_util_1 = require("../utils/jwt.util");
const authRequired = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token no proporcionado o formato incorrecto', success: false });
    }
    const token = authHeader.substring(7);
    try {
        const payload = yield (0, jwt_util_1.verifyToken)(token);
        req.user = payload;
        req.body.userId = payload.uuid;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Token no válido', success: false });
    }
});
exports.authRequired = authRequired;
