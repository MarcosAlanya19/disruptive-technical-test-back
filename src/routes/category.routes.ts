import { Router } from 'express';
import { categoryController } from '../controllers/category.controller';
import { validateSchema } from '../middlewares/validateSchema';
import { Category } from '../models/category.model';

const router = Router();

router.post('/categories', validateSchema(Category), categoryController.createCategory);
router.get('/categories', categoryController.getCategories);
router.get('/categories/:uuid', categoryController.getCategoryById);
router.put('/categories/:uuid', categoryController.updateCategory);
router.delete('/categories/:uuid', categoryController.deleteCategory);

export default router;
