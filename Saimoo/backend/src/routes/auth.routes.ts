import { Router } from 'express';
import { authenticateUser, authorizeRoles } from '../middlewares';

import * as AuthController from '../controllers/auth.controller';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/current-user', authenticateUser, AuthController.currentUser);

export default router;