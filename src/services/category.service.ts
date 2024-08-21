import { BadRequestError } from '../errors/HttpError';
import { CategoryModel, TypeCategory } from '../models/category.model';

class CategoryService {
  async createCategory(categoryData: TypeCategory) {
    const existingCategory = await CategoryModel.findOne({ name: categoryData.name });
    if (existingCategory) {
      throw new BadRequestError('La categoría ya existe');
    }

    const newCategory = new CategoryModel(categoryData);
    return await newCategory.save();
  }

  async getCategories() {
    return await CategoryModel.find();
  }

  async getCategoryById(uuid: string) {
    const category = await CategoryModel.findById(uuid);
    if (!category) {
      throw new BadRequestError('Categoría no encontrada.');
    }
    return category;
  }

  async updateCategory(uuid: string, name: string) {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(uuid, { name }, { new: true });
    if (!updatedCategory) {
      throw new BadRequestError('Categoría no encontrada.');
    }
    return updatedCategory;
  }

  async deleteCategory(uuid: string) {
    const category = await CategoryModel.findByIdAndDelete(uuid);
    if (!category) {
      throw new BadRequestError('Categoría no encontrada.');
    }
    return category;
  }
}

export const categoryService = new CategoryService();
