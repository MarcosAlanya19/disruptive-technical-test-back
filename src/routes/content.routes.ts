import { Router } from 'express';
import { contentController } from '../controllers/ContentController';
import { authRequired } from '../middlewares/validateToken.mdw';

const router = Router();

router.post('/contents', authRequired,contentController.createContent);
router.get('/contents', contentController.getContents);
router.get('/contents/:uuid', contentController.getContentById);
router.put('/contents/:uuid', contentController.updateContent);
router.delete('/contents/:uuid', contentController.deleteContent);

export default router;
