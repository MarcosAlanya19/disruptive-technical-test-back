import { Router } from 'express';
import { seedController } from '../controllers/seed.controller';

const router = Router();

router.get('/seed', seedController.initSeed);

export default router;
