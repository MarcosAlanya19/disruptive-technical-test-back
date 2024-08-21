import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { Content } from '../models/content.model';
import { contentService } from '../services/content.service';
import { UserRequest } from '../types/authRequest';

class ContentController {
  async createContent(req: Request, res: Response, next: NextFunction) {
    try {
      const contentData = req.body as Content;

      const userId = (req as UserRequest).user?.uuid;

      const savedContent = await contentService.createContent(contentData, userId!);
      return res.status(201).json({
        success: true,
        message: 'Contenido creado exitosamente.',
        data: savedContent,
      });
    } catch (error: any) {
      next(error)
    }
  }

  async getContents(req: Request, res: Response, next: NextFunction) {
    try {
      const { category, theme, name } = req.query;

      const filter: Record<string, any> = {};
      if (category) filter['categoryId'] = category;
      if (theme) filter['themeId'] = theme;
      if (name) filter['title'] = { $regex: new RegExp(name as string, 'i') };

      const contents = await contentService.getContents(filter);
      return res.status(200).json({
        success: true,
        data: contents.map((content) => ({
          uuid: content.id,
          title: content.title,
          textContent: content.textContent,
          url: content.url,
          category: content.categoryId,
          theme: content.themeId,
        })),
      });
    } catch (error: any) {
      next(error)
    }
  }

  async getContentNames(req: Request, res: Response, next: NextFunction) {
    try {
      const contents = await contentService.getContentNames();
      const response = contents.map((content) => ({
        name: content.title,
        uuid: content._id.toString(),
      }));

      return res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error: any) {
      next(error)
    }
  }

  async deleteContent(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;

    try {
      const content = await contentService.deleteContent(uuid);
      return res.status(200).json({
        success: true,
        message: 'Contenido eliminado exitosamente.',
        data: content,
      });
    } catch (error: any) {
      next(error)
    }
  }

  async getContentById(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;

    try {
      const content = await contentService.getContentById(uuid);
      return res.status(200).json({
        success: true,
        data: content,
      });
    } catch (error: any) {
      next(error)
    }
  }

  async updateContent(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;
    const contentData = plainToInstance(Content, req.body);

    const errors = await validate(contentData);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors.map((err) => Object.values(err.constraints || {})).flat(),
      });
    }

    try {
      const updatedContent = await contentService.updateContent(uuid, contentData);
      return res.status(200).json({
        success: true,
        message: 'Contenido actualizado exitosamente.',
        data: updatedContent,
      });
    } catch (error: any) {
      next(error)
    }
  }
}

export const contentController = new ContentController();
