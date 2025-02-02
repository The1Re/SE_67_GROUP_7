import { Router } from 'express';
import { register, login, currentUser } from '../controllers/auth.controller';
import isAuth from '../middlewares/isAuth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/current-user', isAuth, currentUser);

export default router;