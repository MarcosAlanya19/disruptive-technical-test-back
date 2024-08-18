import { Router } from 'express';
import { authController } from '../controllers/AuthController';
import { authRequired } from '../middlewares/validateToken.mdw';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/profile', authRequired , authController.profile);
router.get('/verify' , authController.verifyToken);


export default router;
