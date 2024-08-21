import { Category, CategoryModel } from "../models/category.model";
import { Content, ContentModel } from "../models/content.model";
import { Theme, ThemeModel } from "../models/theme.model";
import { User, UserModel, UserRole } from "../models/user.model";
import { authService } from "./auth.service";

export class SeedService {
  constructor() {

  }
  async createCategories() {
    const categories: Category[] = [
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
    ]
    const savedCategorys = await CategoryModel.insertMany(categories);
    return savedCategorys
  }

  async createThemes() {
    const themes: Theme[] = [
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
    ]
    const savedThemes = await ThemeModel.insertMany(themes);
    return savedThemes
  }
  async createUsers() {
    const user1: User = {
      email: "maximo@gmail.com",
      password: "123456789",
      username: "maximo",
      role: UserRole.CREATOR,
      credits: 0,
    }
    const user2: User = {
      email: "maximo1@gmail.com",
      password: "123456789",
      username: "maximo1",
      role: UserRole.READER,
      credits: 0,
    }
    const userCreated1 = await authService.register(user1)
    const userCreated2 = await authService.register(user2)
    return [userCreated1, userCreated2]
  }
  async initSeed() {
    await ContentModel.deleteMany({})
    await CategoryModel.deleteMany({})
    await ThemeModel.deleteMany({})
    await UserModel.deleteMany({})

    const users = await this.createUsers()
    const themes = await this.createThemes()
    const categories = await this.createCategories()

    const contents: Content[] = [
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
    ]
    const contentsSave = await ContentModel.insertMany(contents);
    console.log(contentsSave)
    return true

  }
}

export const seedService = new SeedService()