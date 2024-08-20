import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { ThemeModel } from '../models/theme.model';

class ThemeController {
  async createTheme(req: Request, res: Response): Promise<Response> {
    const reqBody = plainToClass(ThemeModel, req.body);

    const errors = await validate(reqBody);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors.map((err) => Object.values(err.constraints || {})).flat(),
      });
    }

    const { name } = reqBody;

    const existingTheme = await ThemeModel.findOne({ name });
    if (existingTheme) {
      return res.status(400).json({ success: false, message: 'La temática ya existe' });
    }

    try {
      const newTheme = new ThemeModel(reqBody);
      const savedTheme = await newTheme.save();
      return res.status(201).json({
        success: true,
        message: 'Temática creada exitosamente.',
        data: savedTheme,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al crear la temática.',
        error: error.message,
      });
    }
  }

  async getThemes(req: Request, res: Response): Promise<Response> {
    try {
      const themes = await ThemeModel.find();
      return res.status(200).json({
        success: true,
        data: themes.map((theme) => ({
          uuid: theme._id,
          name: theme.name,
        })),
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener las tematicas.',
        error: error.message,
      });
    }
  }

  async deleteTheme(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params;

    try {
      const themes = await ThemeModel.findByIdAndDelete(uuid);
      if (!themes) {
        return res.status(404).json({
          success: false,
          message: 'Teamtica no encontrada.',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Teamtica eliminada exitosamente.',
        data: themes,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al eliminar la tematica.',
        error: error.message,
      });
    }
  }

  async updateTheme(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params;
    const reqBody = plainToClass(ThemeModel, req.body);
    const errors = await validate(reqBody);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors.map((err) => Object.values(err.constraints || {})).flat(),
      });
    }

    try {
      const theme = await ThemeModel.findByIdAndUpdate(uuid, reqBody, { new: true });
      if (!theme) {
        return res.status(404).json({
          success: false,
          message: 'Temática no encontrada.',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Temática actualizada exitosamente.',
        data: theme,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al actualizar la temática.',
        error: error.message,
      });
    }
  }
}

export const themeController = new ThemeController();
