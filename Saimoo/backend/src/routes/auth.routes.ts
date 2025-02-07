import { Router } from 'express';
import { register, login, currentUser } from '../controllers/auth.controller';
import { authenticate } from '../middlewares';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/current-user', authenticate, currentUser);

export default router;