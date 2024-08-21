import { NextFunction, Request, Response } from 'express';
import { Theme } from '../models/theme.model';
import { themeService } from '../services/theme.service';

class ThemeController {
  async createTheme(req: Request, res: Response, next: NextFunction) {
    const reqBody = req.body as Theme
    try {
      const savedTheme = await themeService.createTheme(reqBody);
      return res.status(201).json({
        success: true,
        message: 'Temática creada exitosamente.',
        data: savedTheme,
      });
    } catch (error: any) {
      next(error)
    }
  }

  async getThemes(req: Request, res: Response, next: NextFunction) {
    try {
      const themes = await themeService.getThemes();
      return res.status(200).json({
        success: true,
        data: themes.map((theme) => ({
          uuid: theme._id,
          name: theme.name,
        })),
      });
    } catch (error: any) {
      next(error)

    }
  }

  async deleteTheme(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;

    try {
      const theme = await themeService.deleteTheme(uuid);
      return res.status(200).json({
        success: true,
        message: 'Temática eliminada exitosamente.',
        data: theme,
      });
    } catch (error: any) {
      next(error)

    }
  }

  async updateTheme(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;
    const reqBody = req.body as Theme;
    try {
      const updatedTheme = await themeService.updateTheme(uuid, reqBody);
      return res.status(200).json({
        success: true,
        message: 'Temática actualizada exitosamente.',
        data: updatedTheme,
      });
    } catch (error: any) {
      next(error)
    }
  }
}

export const themeController = new ThemeController();
