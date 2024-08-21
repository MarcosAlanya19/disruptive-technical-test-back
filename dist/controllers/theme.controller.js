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
exports.themeController = void 0;
const theme_service_1 = require("../services/theme.service");
class ThemeController {
    createTheme(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqBody = req.body;
            try {
                const savedTheme = yield theme_service_1.themeService.createTheme(reqBody);
                return res.status(201).json({
                    success: true,
                    message: 'Temática creada exitosamente.',
                    data: savedTheme,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getThemes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const themes = yield theme_service_1.themeService.getThemes();
                return res.status(200).json({
                    success: true,
                    data: themes.map((theme) => ({
                        uuid: theme._id,
                        name: theme.name,
                    })),
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteTheme(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uuid } = req.params;
            try {
                const theme = yield theme_service_1.themeService.deleteTheme(uuid);
                return res.status(200).json({
                    success: true,
                    message: 'Temática eliminada exitosamente.',
                    data: theme,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateTheme(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uuid } = req.params;
            const reqBody = req.body;
            try {
                const updatedTheme = yield theme_service_1.themeService.updateTheme(uuid, reqBody);
                return res.status(200).json({
                    success: true,
                    message: 'Temática actualizada exitosamente.',
                    data: updatedTheme,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.themeController = new ThemeController();
