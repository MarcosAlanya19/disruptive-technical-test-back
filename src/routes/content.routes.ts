import { Router } from 'express';
import { contentController } from '../controllers/content.controller';
import { validateSchema } from '../middlewares/validateSchema';
import { authRequired } from '../middlewares/validateToken.mdw';
import { Content } from '../models/content.model';

const router = Router();

router.post('/contents', authRequired, validateSchema(Content), contentController.createContent);
router.get('/contents', contentController.getContents);
router.get('/contents/:uuid', contentController.getContentById);
router.get('/contents/simple', contentController.getContentNames);
router.put('/contents/:uuid', contentController.updateContent);
router.delete('/contents/:uuid', contentController.deleteContent);

export default router;
