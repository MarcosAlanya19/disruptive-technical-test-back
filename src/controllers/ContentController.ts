import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { Content, ContentModel, TypeContent } from '../models/content.model';
import { UserModel } from '../models/user.model';
import { CategoryModel } from '../models/category.model';
import { ThemeModel } from '../models/theme.model';
import { UserRequest } from '../types/authRequest';

class ContentController {
  async createContent(req: Request, res: Response): Promise<Response> {
    try {
      const contentData = plainToInstance(Content, req.body);

      const errors = await validate(contentData);

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: errors.map((err) => Object.values(err.constraints || {})).flat(),
        });
      }

      const user = await UserModel.findById((req as any).user.uuid);


      if (!user) {
        return res.status(400).json({ success: false, message: 'Usuario no encontrado' });
      }

      const category = await CategoryModel.findById(contentData.categoryId);
      if (!category) {
        return res.status(400).json({ success: false, message: 'Categoría no encontrada' });
      }

      const theme = await ThemeModel.findById(contentData.themeId);
      if (!theme) {
        return res.status(400).json({ success: false, message: 'Tema no encontrado' });
      }

      const newContent = new ContentModel({
        title: contentData.title,
        textContent: contentData.textContent,
        url: contentData.url,
        categoryId: contentData.categoryId,
        themeId: contentData.themeId,
      });

      const savedContent = await newContent.save();

      return res.status(201).json({
        success: true,
        message: 'Contenido creado exitosamente.',
        data: savedContent,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al crear el contenido.',
        error: error.message,
      });
    }
  }

  async getContents(req: Request, res: Response): Promise<Response> {
    try {
      const contents = await ContentModel.find()
      .populate('credits')
      .populate('categoryId')
      .populate('themeId');

      return res.status(200).json({
        success: true,
        data: contents.map(contents => ({
          uuid: contents.id,
          title: contents.title,
          textContent: contents.textContent,
          url: contents.url,
          category: contents.categoryId,
          theme: contents.themeId,
        })),
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener los contenidos.',
        error: error.message,
      });
    }
  }

  async deleteContent(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params;

    try {
      const content = await ContentModel.findByIdAndDelete(uuid);
      if (!content) {
        return res.status(404).json({
          success: false,
          message: 'Contenido no encontrado.',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Contenido eliminado exitosamente.',
        data: content,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al eliminar el contenido.',
        error: error.message,
      });
    }
  }

  async getContentById(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params;

    try {
      const content = await ContentModel.findById(uuid).populate('credits', 'username').populate('categoryId', 'name').populate('themeId', 'name');
      if (!content) {
        return res.status(404).json({
          success: false,
          message: 'Contenido no encontrado.',
        });
      }
      return res.status(200).json({
        success: true,
        data: content,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener el contenido.',
        error: error.message,
      });
    }
  }

  async updateContent(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params;
    const contentData = plainToInstance(ContentModel, req.body);
    const errors = await validate(contentData);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors.map((err) => Object.values(err.constraints || {})).flat(),
      });
    }

    try {
      const content = await ContentModel.findByIdAndUpdate(uuid, contentData, { new: true });
      if (!content) {
        return res.status(404).json({
          success: false,
          message: 'Contenido no encontrado.',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Contenido actualizado exitosamente.',
        data: content,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al actualizar el contenido.',
        error: error.message,
      });
    }
  }
}

export const contentController = new ContentController();
