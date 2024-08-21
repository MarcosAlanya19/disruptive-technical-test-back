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
exports.UserModel = exports.User = exports.UserRole = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const class_validator_1 = require("class-validator");
var UserRole;
(function (UserRole) {
    UserRole["READER"] = "Reader";
    UserRole["CREATOR"] = "Creator";
    UserRole["ADMIN"] = "Admin";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = class User extends defaultClasses_1.TimeStamps {
};
exports.User = User;
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true }),
    (0, class_validator_1.Length)(3, 20, { message: 'El nombre de usuario debe tener entre 3 y 20 caracteres.' }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true }),
    (0, class_validator_1.IsEmail)({}, { message: 'El correo electrónico no es válido.' }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: false, default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "credits", void 0);
__decorate([
    (0, typegoose_1.prop)({ enum: UserRole, default: UserRole.READER }),
    (0, class_validator_1.IsEnum)(UserRole, { message: 'El rol de usuario no es válido.' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La contraseña no puede estar vacía.' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
exports.User = User = __decorate([
    (0, typegoose_1.modelOptions)({ schemaOptions: { collection: 'users' } })
], User);
exports.UserModel = (0, typegoose_1.getModelForClass)(User);
