import { BadRequestError } from '../errors/HttpError';
import { Theme, ThemeModel } from '../models/theme.model';

class ThemeService {
  async createTheme(reqBody: Theme) {
    const { name } = reqBody;

    const existingTheme = await ThemeModel.findOne({ name });
    if (existingTheme) {
      throw new BadRequestError('La temática ya existe');
    }

    const newTheme = new ThemeModel(reqBody);
    return await newTheme.save();
  }

  async getThemes() {
    return await ThemeModel.find();
  }

  async deleteTheme(uuid: string) {
    const theme = await ThemeModel.findByIdAndDelete(uuid);
    if (!theme) {
      throw new BadRequestError('Temática no encontrada');
    }
    return theme;
  }

  async updateTheme(uuid: string, reqBody: Theme) {
    const updatedTheme = await ThemeModel.findByIdAndUpdate(uuid, reqBody, { new: true });
    if (!updatedTheme) {
      throw new BadRequestError('Temática no encontrada');
    }
    return updatedTheme;
  }
}

export const themeService = new ThemeService();
