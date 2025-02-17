import { Router } from 'express';
import { register, login, currentUser } from '../controllers/auth.controller';
import { authenticateUser, authorizeRoles } from '../middlewares';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/current-user', authenticateUser, currentUser);

export default router;