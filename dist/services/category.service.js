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
exports.categoryService = void 0;
const HttpError_1 = require("../errors/HttpError");
const category_model_1 = require("../models/category.model");
class CategoryService {
    createCategory(categoryData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingCategory = yield category_model_1.CategoryModel.findOne({ name: categoryData.name });
            if (existingCategory) {
                throw new HttpError_1.BadRequestError('La categoría ya existe');
            }
            const newCategory = new category_model_1.CategoryModel(categoryData);
            return yield newCategory.save();
        });
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield category_model_1.CategoryModel.find();
        });
    }
    getCategoryById(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield category_model_1.CategoryModel.findById(uuid);
            if (!category) {
                throw new HttpError_1.BadRequestError('Categoría no encontrada.');
            }
            return category;
        });
    }
    updateCategory(uuid, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedCategory = yield category_model_1.CategoryModel.findByIdAndUpdate(uuid, { name }, { new: true });
            if (!updatedCategory) {
                throw new HttpError_1.BadRequestError('Categoría no encontrada.');
            }
            return updatedCategory;
        });
    }
    deleteCategory(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield category_model_1.CategoryModel.findByIdAndDelete(uuid);
            if (!category) {
                throw new HttpError_1.BadRequestError('Categoría no encontrada.');
            }
            return category;
        });
    }
}
exports.categoryService = new CategoryService();
