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
exports.themeService = void 0;
const HttpError_1 = require("../errors/HttpError");
const theme_model_1 = require("../models/theme.model");
class ThemeService {
    createTheme(reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = reqBody;
            const existingTheme = yield theme_model_1.ThemeModel.findOne({ name });
            if (existingTheme) {
                throw new HttpError_1.BadRequestError('La temática ya existe');
            }
            const newTheme = new theme_model_1.ThemeModel(reqBody);
            return yield newTheme.save();
        });
    }
    getThemes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield theme_model_1.ThemeModel.find();
        });
    }
    deleteTheme(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const theme = yield theme_model_1.ThemeModel.findByIdAndDelete(uuid);
            if (!theme) {
                throw new HttpError_1.BadRequestError('Temática no encontrada');
            }
            return theme;
        });
    }
    updateTheme(uuid, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedTheme = yield theme_model_1.ThemeModel.findByIdAndUpdate(uuid, reqBody, { new: true });
            if (!updatedTheme) {
                throw new HttpError_1.BadRequestError('Temática no encontrada');
            }
            return updatedTheme;
        });
    }
}
exports.themeService = new ThemeService();
