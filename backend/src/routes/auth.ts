import { Router } from 'express';
import { register, login, getProfile, registerValidation, loginValidation } from '../controllers/authController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/profile', authenticateJWT, getProfile);

export default router;