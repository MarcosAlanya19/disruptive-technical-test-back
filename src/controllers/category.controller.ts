import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { Category, CategoryModel } from '../models/category.model';
import { categoryService } from '../services/category.service';

class CategoryController {
  async createCategory(req: Request, res: Response, next: NextFunction) {
    const reqBody = req.body as Category;
    try {
      const savedCategory = await categoryService.createCategory(reqBody);
      return res.status(201).json({
        success: true,
        message: 'Categoría creada exitosamente.',
        data: savedCategory,
      });
    } catch (error: any) {
      next(error)
    }
  }

  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoryService.getCategories();
      return res.status(200).json({
        success: true,
        data: categories.map(category => ({
          name: category.name,
          uuid: category._id
        })),
      });
    } catch (error: any) {
      next(error)
    }
  }

  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;

    try {
      const category = await categoryService.getCategoryById(uuid);
      return res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error: any) {
      next(error)
    }
  }

  async updateCategory(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;
    const reqBody = plainToClass(CategoryModel, req.body);
    const errors = await validate(reqBody);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors.map((err) => Object.values(err.constraints || {})).flat(),
      });
    }

    try {
      const updatedCategory = await categoryService.updateCategory(uuid, reqBody.name);
      return res.status(200).json({
        success: true,
        message: 'Categoría actualizada exitosamente.',
        data: updatedCategory,
      });
    } catch (error: any) {
      next(error)
    }
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;

    try {
      const category = await categoryService.deleteCategory(uuid);
      return res.status(200).json({
        success: true,
        message: 'Categoría eliminada exitosamente.',
        data: category,
      });
    } catch (error: any) {
      next(error)
    }
  }
}

export const categoryController = new CategoryController();
