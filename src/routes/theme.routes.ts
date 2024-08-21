import { Router } from 'express';
import { themeController } from '../controllers/theme.controller';
import { validateSchema } from '../middlewares/validateSchema';
import { Theme } from '../models/theme.model';

const router = Router();

router.post('/themes', validateSchema(Theme), themeController.createTheme);
router.get('/themes', themeController.getThemes);
router.delete('/themes/:uuid', themeController.deleteTheme);
router.put('/themes/:uuid', themeController.updateTheme);

export default router;
