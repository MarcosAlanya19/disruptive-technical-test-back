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
exports.CategoryModel = exports.Category = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const class_validator_1 = require("class-validator");
let Category = class Category {
};
exports.Category = Category;
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre de la categoría no puede estar vacío.' }),
    (0, class_validator_1.Length)(3, 50, { message: 'El nombre de la categoría debe tener entre 3 y 50 caracteres.' }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La URL de la imagen es obligatoria.' }),
    (0, class_validator_1.IsUrl)({}, { message: 'La URL de la imagen no es válida.' }),
    __metadata("design:type", String)
], Category.prototype, "image", void 0);
exports.Category = Category = __decorate([
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: 'categories' } })
], Category);
const CategoryModel = (0, typegoose_1.getModelForClass)(Category);
exports.CategoryModel = CategoryModel;
