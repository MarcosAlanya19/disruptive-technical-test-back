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
exports.contentService = void 0;
const HttpError_1 = require("../errors/HttpError");
const category_model_1 = require("../models/category.model");
const content_model_1 = require("../models/content.model");
const theme_model_1 = require("../models/theme.model");
const user_model_1 = require("../models/user.model");
class ContentService {
    createContent(contentData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findById(userId);
            if (!user) {
                throw new HttpError_1.BadRequestError('Usuario no encontrado');
            }
            const category = yield category_model_1.CategoryModel.findById(contentData.categoryId);
            if (!category) {
                throw new HttpError_1.BadRequestError('Categoría no encontrada');
            }
            const theme = yield theme_model_1.ThemeModel.findById(contentData.themeId);
            if (!theme) {
                throw new HttpError_1.BadRequestError('Tema no encontrado');
            }
            const newContent = new content_model_1.ContentModel({
                title: contentData.title,
                textContent: contentData.textContent,
                url: contentData.url,
                categoryId: contentData.categoryId,
                themeId: contentData.themeId,
                userId,
            });
            const savedContent = yield newContent.save();
            user.credits += 1;
            yield user.save();
            return savedContent;
        });
    }
    getContents(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield content_model_1.ContentModel.find(filter).populate('categoryId').populate('themeId').sort({ 'categoryId.name': 1, 'themeId.name': 1 });
        });
    }
    getContentNames() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield content_model_1.ContentModel.find().select('title _id').sort({ title: 1 });
        });
    }
    getContentById(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield content_model_1.ContentModel.findById(uuid).populate('credits', 'username').populate('categoryId', 'name').populate('themeId', 'name');
            if (!content) {
                throw new HttpError_1.BadRequestError('Contenido no encontrado');
            }
            return content;
        });
    }
    deleteContent(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield content_model_1.ContentModel.findByIdAndDelete(uuid);
            if (!content) {
                throw new HttpError_1.BadRequestError('Contenido no encontrado');
            }
            return content;
        });
    }
    updateContent(uuid, contentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedContent = yield content_model_1.ContentModel.findByIdAndUpdate(uuid, contentData, { new: true });
            if (!updatedContent) {
                throw new HttpError_1.BadRequestError('Contenido no encontrado');
            }
            return updatedContent;
        });
    }
}
exports.contentService = new ContentService();
