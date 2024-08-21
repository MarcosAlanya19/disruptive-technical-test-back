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
exports.authController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDto = req.body;
            try {
                const userSaved = yield auth_service_1.authService.register(userDto);
                return res.status(201).json({
                    success: true,
                    message: 'Registro exitoso.',
                    data: {
                        uuid: userSaved._id,
                        username: userSaved.username,
                        email: userSaved.email,
                        role: userSaved.role,
                        credits: userSaved.credits,
                    },
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const { token, user } = yield auth_service_1.authService.login(email, password);
                res.setHeader('Authorization', `Bearer ${token}`);
                return res.status(200).json({
                    token,
                    success: true,
                    message: 'Inicio de sesión exitoso.',
                    data: {
                        uuid: user._id,
                        username: user.username,
                        email: user.email,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                        role: user.role,
                        credits: user.credits,
                    },
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    profile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield auth_service_1.authService.getProfile(req.user.uuid);
                return res.status(200).json({
                    success: true,
                    message: 'Usuario encontrado con éxito.',
                    data: {
                        uuid: user._id,
                        username: user.username,
                        email: user.email,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                    },
                });
            }
            catch (error) {
                return res.status(409).json({
                    success: false,
                    message: error.message,
                });
            }
        });
    }
    verifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers['authorization'];
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({
                    success: false,
                    message: 'No autorizado. Token no proporcionado o formato incorrecto.',
                });
            }
            const token = authHeader.substring(7);
            try {
                const user = yield auth_service_1.authService.verifyToken(token);
                return res.status(200).json({
                    success: true,
                    data: {
                        uuid: user._id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        credits: user.credits,
                    },
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.authController = new AuthController();
