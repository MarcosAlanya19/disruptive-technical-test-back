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
exports.seedService = exports.SeedService = void 0;
const category_model_1 = require("../models/category.model");
const content_model_1 = require("../models/content.model");
const theme_model_1 = require("../models/theme.model");
const user_model_1 = require("../models/user.model");
const auth_service_1 = require("./auth.service");
class SeedService {
    constructor() {
    }
    createCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = [
                {
                    image: "https://picsum.photos/400/400",
                    name: "Imagenes"
                },
                {
                    image: "https://picsum.photos/400/400",
                    name: "Video"
                },
                {
                    image: "https://picsum.photos/400/400",
                    name: "Texto"
                },
            ];
            const savedCategorys = yield category_model_1.CategoryModel.insertMany(categories);
            return savedCategorys;
        });
    }
    createThemes() {
        return __awaiter(this, void 0, void 0, function* () {
            const themes = [
                {
                    name: "Deportes",
                    allowsImages: true,
                    allowsTexts: true,
                    allowsVideos: true,
                },
                {
                    name: "Ciencias",
                    allowsImages: true,
                    allowsTexts: true,
                    allowsVideos: true,
                },
                {
                    name: "Matemáticas",
                    allowsImages: true,
                    allowsTexts: true,
                    allowsVideos: true,
                },
            ];
            const savedThemes = yield theme_model_1.ThemeModel.insertMany(themes);
            return savedThemes;
        });
    }
    createUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const user1 = {
                email: "maximo@gmail.com",
                password: "123456789",
                username: "maximo",
                role: user_model_1.UserRole.CREATOR,
                credits: 0,
            };
            const user2 = {
                email: "maximo1@gmail.com",
                password: "123456789",
                username: "maximo1",
                role: user_model_1.UserRole.READER,
                credits: 0,
            };
            const userCreated1 = yield auth_service_1.authService.register(user1);
            const userCreated2 = yield auth_service_1.authService.register(user2);
            return [userCreated1, userCreated2];
        });
    }
    initSeed() {
        return __awaiter(this, void 0, void 0, function* () {
            yield content_model_1.ContentModel.deleteMany({});
            yield category_model_1.CategoryModel.deleteMany({});
            yield theme_model_1.ThemeModel.deleteMany({});
            yield user_model_1.UserModel.deleteMany({});
            const users = yield this.createUsers();
            const themes = yield this.createThemes();
            const categories = yield this.createCategories();
            const contents = [
                {
                    categoryId: categories[0]._id,
                    themeId: themes[0]._id,
                    title: "Titulo 1 test",
                    textContent: "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo",
                    url: "https://picsum.photos/400/400",
                    userId: users[0]._id
                },
                {
                    categoryId: categories[1]._id,
                    themeId: themes[1]._id,
                    title: "Titulo 2 test",
                    textContent: "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo",
                    url: "https://picsum.photos/400/400",
                    userId: users[0]._id
                },
                {
                    categoryId: categories[2]._id,
                    themeId: themes[2]._id,
                    title: "Titulo 3 test",
                    textContent: "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo",
                    url: "https://picsum.photos/400/400",
                    userId: users[0]._id
                }
            ];
            const contentsSave = yield content_model_1.ContentModel.insertMany(contents);
            console.log(contentsSave);
            return true;
        });
    }
}
exports.SeedService = SeedService;
exports.seedService = new SeedService();
