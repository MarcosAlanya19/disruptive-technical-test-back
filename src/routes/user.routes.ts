import { Router } from 'express';
import { usersController } from '../controllers/UserController';

const router = Router();

router.get('/users', usersController.getUsers);

export default router;
