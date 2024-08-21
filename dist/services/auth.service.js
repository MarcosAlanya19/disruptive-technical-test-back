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
exports.authService = void 0;
const HttpError_1 = require("../errors/HttpError");
const user_model_1 = require("../models/user.model");
const bcryptHelpers_util_1 = require("../utils/bcryptHelpers.util");
const jwt_util_1 = require("../utils/jwt.util");
class AuthService {
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, role, username } = userData;
            const existingUser = yield user_model_1.UserModel.findOne({ email });
            if (existingUser) {
                throw new HttpError_1.BadRequestError('El usuario ya está registrado.');
            }
            const hashedPassword = yield (0, bcryptHelpers_util_1.hashPassword)(password);
            const newUser = new user_model_1.UserModel({ email, role, username, password: hashedPassword, credits: 0 });
            return yield newUser.save();
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFound = yield user_model_1.UserModel.findOne({ email });
            if (!userFound) {
                throw new HttpError_1.BadRequestError('Credenciales incorrectas.');
            }
            const isMatch = yield (0, bcryptHelpers_util_1.comparePasswords)(password, userFound.password);
            if (!isMatch) {
                throw new HttpError_1.BadRequestError('Credenciales incorrectas.');
            }
            const token = yield (0, jwt_util_1.createAccessToken)({ uuid: userFound._id.toString(), role: userFound.role });
            return { token, user: userFound };
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Date(0);
        });
    }
    getProfile(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRequest = yield user_model_1.UserModel.findById(uuid);
            if (!userRequest) {
                throw new HttpError_1.BadRequestError('Usuario no encontrado.');
            }
            return userRequest;
        });
    }
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = yield (0, jwt_util_1.verifyToken)(token);
            const userFound = yield user_model_1.UserModel.findById(payload.uuid);
            if (!userFound) {
                throw new HttpError_1.UnauthorizedError('No autorizado. Usuario no encontrado.');
            }
            return userFound;
        });
    }
}
exports.authService = new AuthService();
