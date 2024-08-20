import { Router } from 'express';
import { themeController } from '../controllers/ThemeController';

const router = Router();

router.post('/themes', themeController.createTheme);
router.get('/themes', themeController.getThemes);
router.delete('/themes/:uuid', themeController.deleteTheme);
router.put('/themes/:uuid', themeController.updateTheme);

export default router;
