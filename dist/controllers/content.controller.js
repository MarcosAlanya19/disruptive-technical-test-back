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
exports.contentController = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const content_model_1 = require("../models/content.model");
const content_service_1 = require("../services/content.service");
class ContentController {
    createContent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { categoryId, themeId, title, textContent, url } = req.body;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.uuid;
                const savedContent = yield content_service_1.contentService.createContent({ categoryId, themeId, title, textContent, url }, userId);
                return res.status(201).json({
                    success: true,
                    message: 'Contenido creado exitosamente.',
                    data: savedContent,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getContents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category, theme, name } = req.query;
                const filter = {};
                if (category)
                    filter['categoryId'] = category;
                if (theme)
                    filter['themeId'] = theme;
                if (name)
                    filter['title'] = { $regex: new RegExp(name, 'i') };
                const contents = yield content_service_1.contentService.getContents(filter);
                return res.status(200).json({
                    success: true,
                    data: contents.map((content) => ({
                        uuid: content.id,
                        title: content.title,
                        textContent: content.textContent,
                        url: content.url,
                        category: content.categoryId,
                        theme: content.themeId,
                    })),
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getContentNames(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contents = yield content_service_1.contentService.getContentNames();
                const response = contents.map((content) => ({
                    name: content.title,
                    uuid: content._id.toString(),
                }));
                return res.status(200).json({
                    success: true,
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteContent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uuid } = req.params;
            try {
                const content = yield content_service_1.contentService.deleteContent(uuid);
                return res.status(200).json({
                    success: true,
                    message: 'Contenido eliminado exitosamente.',
                    data: content,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getContentById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uuid } = req.params;
            try {
                const content = yield content_service_1.contentService.getContentById(uuid);
                return res.status(200).json({
                    success: true,
                    data: content,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateContent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uuid } = req.params;
            const contentData = (0, class_transformer_1.plainToInstance)(content_model_1.Content, req.body);
            const errors = yield (0, class_validator_1.validate)(contentData);
            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: errors.map((err) => Object.values(err.constraints || {})).flat(),
                });
            }
            try {
                const updatedContent = yield content_service_1.contentService.updateContent(uuid, contentData);
                return res.status(200).json({
                    success: true,
                    message: 'Contenido actualizado exitosamente.',
                    data: updatedContent,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.contentController = new ContentController();
