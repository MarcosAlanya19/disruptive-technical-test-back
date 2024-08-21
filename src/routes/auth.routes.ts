import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { LoginDto } from '../dtos/Login.dto';
import { validateSchema } from '../middlewares/validateSchema';
import { authRequired } from '../middlewares/validateToken.mdw';
import { User } from '../models/user.model';

const router = Router();

router.post('/register', validateSchema(User), authController.register);
router.post('/login', validateSchema(LoginDto), authController.login);
router.get('/profile', authRequired, authController.profile);
router.get('/verify', authController.verifyToken);

export default router;
