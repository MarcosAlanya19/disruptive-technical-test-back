import { BadRequestError } from '../errors/HttpError';
import { CategoryModel } from '../models/category.model';
import { Content, ContentModel } from '../models/content.model';
import { ThemeModel } from '../models/theme.model';
import { UserModel } from '../models/user.model';

class ContentService {
  async createContent(contentData: Content, userId: string) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new BadRequestError('Usuario no encontrado');
    }

    const category = await CategoryModel.findById(contentData.categoryId);
    if (!category) {
      throw new BadRequestError('Categoría no encontrada');
    }

    const theme = await ThemeModel.findById(contentData.themeId);
    if (!theme) {
      throw new BadRequestError('Tema no encontrado');
    }

    const newContent = new ContentModel({
      title: contentData.title,
      textContent: contentData.textContent,
      url: contentData.url,
      categoryId: contentData.categoryId,
      themeId: contentData.themeId,
      userId: user._id
    });

    const savedContent = await newContent.save();
    user.credits += 1;
    await user.save();

    return savedContent;
  }

  async getContents(filter: Record<string, any>) {
    return await ContentModel.find(filter)
      .populate('categoryId')
      .populate('themeId')
      .sort({ 'categoryId.name': 1, 'themeId.name': 1 });
  }

  async getContentNames() {
    return await ContentModel.find().select('title _id').sort({ title: 1 });
  }

  async getContentById(uuid: string) {
    const content = await ContentModel.findById(uuid)
      .populate('credits', 'username')
      .populate('categoryId', 'name')
      .populate('themeId', 'name');
    if (!content) {
      throw new BadRequestError('Contenido no encontrado');
    }
    return content;
  }

  async deleteContent(uuid: string) {
    const content = await ContentModel.findByIdAndDelete(uuid);
    if (!content) {
      throw new BadRequestError('Contenido no encontrado');
    }
    return content;
  }

  async updateContent(uuid: string, contentData: Content) {
    const updatedContent = await ContentModel.findByIdAndUpdate(uuid, contentData, { new: true });
    if (!updatedContent) {
      throw new BadRequestError('Contenido no encontrado');
    }
    return updatedContent;
  }
}

export const contentService = new ContentService();
