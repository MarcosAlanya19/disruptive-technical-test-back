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
exports.ThemeModel = exports.Theme = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const class_validator_1 = require("class-validator");
let Theme = class Theme {
};
exports.Theme = Theme;
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre de la temática no puede estar vacío.' }),
    (0, class_validator_1.Length)(3, 50, { message: 'El nombre de la temática debe tener entre 3 y 50 caracteres.' }),
    __metadata("design:type", String)
], Theme.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Boolean, default: false }),
    (0, class_validator_1.IsBoolean)({ message: 'El valor de permitir imágenes debe ser un booleano.' }),
    __metadata("design:type", Boolean)
], Theme.prototype, "allowsImages", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Boolean, default: false }),
    (0, class_validator_1.IsBoolean)({ message: 'El valor de permitir videos debe ser un booleano.' }),
    __metadata("design:type", Boolean)
], Theme.prototype, "allowsVideos", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Boolean, default: false }),
    (0, class_validator_1.IsBoolean)({ message: 'El valor de permitir textos debe ser un booleano.' }),
    __metadata("design:type", Boolean)
], Theme.prototype, "allowsTexts", void 0);
exports.Theme = Theme = __decorate([
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: 'themes' } })
], Theme);
const ThemeModel = (0, typegoose_1.getModelForClass)(Theme);
exports.ThemeModel = ThemeModel;
