import { Router } from 'express';
import { categoryController } from '../controllers/CategoryController';

const router = Router();

router.post('/categories', categoryController.createCategory);
router.get('/categories', categoryController.getCategories);
router.get('/categories/:uuid', categoryController.getCategoryById);
router.put('/categories/:uuid', categoryController.updateCategory);
router.delete('/categories/:uuid', categoryController.deleteCategory);

export default router;
