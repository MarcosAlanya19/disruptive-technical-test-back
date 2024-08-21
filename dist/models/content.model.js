"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = exports.Content = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const class_validator_1 = require("class-validator");
const category_model_1 = require("./category.model");
const theme_model_1 = require("./theme.model");
const user_model_1 = require("./user.model");
let Content = class Content {
};
exports.Content = Content;
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El título del contenido no puede estar vacío.' }),
    (0, class_validator_1.Length)(3, 100, { message: 'El título del contenido debe tener entre 3 y 100 caracteres.' }),
    __metadata("design:type", String)
], Content.prototype, "title", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({}, { message: 'La URL proporcionada no es válida.' }),
    __metadata("design:type", String)
], Content.prototype, "url", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'El contenido textual debe ser una cadena de texto.' }),
    __metadata("design:type", String)
], Content.prototype, "textContent", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => category_model_1.Category, required: true }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La categoría es obligatoria.' }),
    __metadata("design:type", Object)
], Content.prototype, "categoryId", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => theme_model_1.Theme, required: true }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La temática es obligatoria.' }),
    __metadata("design:type", Object)
], Content.prototype, "themeId", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => user_model_1.User, required: true }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El user es obligatoria.' }),
    __metadata("design:type", Object)
], Content.prototype, "userId", void 0);
exports.Content = Content = __decorate([
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: 'contents' } })
], Content);
const ContentModel = (0, typegoose_1.getModelForClass)(Content);
exports.ContentModel = ContentModel;
