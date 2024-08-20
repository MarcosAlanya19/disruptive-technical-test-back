import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.mdw';
import { usersController } from '../controllers/UserController';

const router = Router();

router.get('/users', usersController.getUsers);

export default router;
