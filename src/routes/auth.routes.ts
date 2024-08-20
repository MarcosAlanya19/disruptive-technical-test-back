import { Router } from 'express';
import { authController } from '../controllers/AuthController';
import { validateSchema } from '../middlewares/validateSchema';
import { authRequired } from '../middlewares/validateToken.mdw';
import { User, UserDto, UserModel } from '../models/user.model';

const router = Router();

router.post('/register', validateSchema(UserDto), authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/profile', authRequired, authController.profile);
router.get('/verify', authController.verifyToken);

export default router;
