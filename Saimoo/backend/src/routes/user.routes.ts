import { Router } from 'express';
import { authenticateUser, authorizeRoles } from '../middlewares';

import * as UserController from '../controllers/user.controller';

const router = Router();

router.get('/', UserController.getAllUsers)
router.get('/:id', UserController.getUser)
router.post('/', UserController.createUser)
router.put('/', UserController.updateUser)
router.delete('/', UserController.deleteUser)

export default router;