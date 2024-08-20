import { Request, Response } from 'express';
import { CategoryModel, TypeCategory } from '../models/category.model';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

class CategoryController {
  async createCategory(req: Request, res: Response): Promise<Response> {
    const reqBody = plainToClass(CategoryModel, req.body);

    const errors = await validate(reqBody);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors.map((err) => Object.values(err.constraints || {})).flat(),
      });
    }

    const { name } = reqBody;

    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ success: false, message: 'La categoría ya existe' });
    }

    try {
      const newCategory = new CategoryModel(reqBody);
      const savedCategory = await newCategory.save();
      return res.status(201).json({
        success: true,
        message: 'Categoría creada exitosamente.',
        data: savedCategory,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al crear la categoría.',
        error: error.message,
      });
    }
  }

  async getCategories(req: Request, res: Response): Promise<Response> {
    try {
      const categories = await CategoryModel.find();
      return res.status(200).json({
        success: true,
        data: categories.map(category => ({
          name: category.name,
          uuid: category._id
        })),
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener las categorias.',
        error: error.message,
      });
    }
  }

  async getCategoryById(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params;

    try {
      const category = await CategoryModel.findById(uuid);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Categoría no encontrada.',
        });
      }
      return res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al obtener la categoría.',
        error: error.message,
      });
    }
  }

  async deleteCategory(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params;

    try {
      const category = await CategoryModel.findByIdAndDelete(uuid);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Categoría no encontrada.',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Categoría eliminada exitosamente.',
        data: category,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al eliminar la categoría.',
        error: error.message,
      });
    }
  }

  async updateCategory(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params;
    const reqBody = plainToClass(CategoryModel, req.body);
    const errors = await validate(reqBody);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: errors.map((err) => Object.values(err.constraints || {})).flat(),
      });
    }

    const { name } = reqBody;

    try {
      const updatedCategory = await CategoryModel.findByIdAndUpdate(uuid, { name }, { new: true });
      if (!updatedCategory) {
        return res.status(404).json({
          success: false,
          message: 'Categoría no encontrada.',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Categoría actualizada exitosamente.',
        data: updatedCategory,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al actualizar la categoría.',
        error: error.message,
      });
    }
  }

  async deleteTask(req: Request, res: Response): Promise<Response> {
    const { uuid } = req.params;

    try {
      const category = await CategoryModel.findByIdAndDelete(uuid);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Categoria no encontrada.',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Categoria eliminada exitosamente.',
        data: category,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'Error al eliminar la categoria.',
        error: error.message,
      });
    }
  }
}

export const categoryController = new CategoryController();
