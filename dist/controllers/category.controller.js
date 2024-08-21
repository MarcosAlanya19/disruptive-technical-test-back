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
exports.categoryController = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const category_model_1 = require("../models/category.model");
const category_service_1 = require("../services/category.service");
class CategoryController {
    createCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqBody = req.body;
            try {
                const savedCategory = yield category_service_1.categoryService.createCategory(reqBody);
                return res.status(201).json({
                    success: true,
                    message: 'Categoría creada exitosamente.',
                    data: savedCategory,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getCategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield category_service_1.categoryService.getCategories();
                return res.status(200).json({
                    success: true,
                    data: categories.map(category => ({
                        name: category.name,
                        uuid: category._id
                    })),
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getCategoryById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uuid } = req.params;
            try {
                const category = yield category_service_1.categoryService.getCategoryById(uuid);
                return res.status(200).json({
                    success: true,
                    data: category,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uuid } = req.params;
            const reqBody = (0, class_transformer_1.plainToClass)(category_model_1.CategoryModel, req.body);
            const errors = yield (0, class_validator_1.validate)(reqBody);
            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: errors.map((err) => Object.values(err.constraints || {})).flat(),
                });
            }
            try {
                const updatedCategory = yield category_service_1.categoryService.updateCategory(uuid, reqBody.name);
                return res.status(200).json({
                    success: true,
                    message: 'Categoría actualizada exitosamente.',
                    data: updatedCategory,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uuid } = req.params;
            try {
                const category = yield category_service_1.categoryService.deleteCategory(uuid);
                return res.status(200).json({
                    success: true,
                    message: 'Categoría eliminada exitosamente.',
                    data: category,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.categoryController = new CategoryController();
