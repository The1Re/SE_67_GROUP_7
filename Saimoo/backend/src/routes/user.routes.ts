import { Router } from 'express';
import { authenticateUser, authorizeRoles } from '../middlewares';

import * as UserController from '../controllers/user.controller';

const router = Router();

router.get('/', authorizeRoles('admin'), UserController.getAllUsers)
router.get('/:id', UserController.getUser)
router.post('/', authorizeRoles('admin'), UserController.createUser)
router.put('/', authorizeRoles('admin'), UserController.updateUser)
router.delete('/:id', authorizeRoles('admin'), UserController.deleteUser)

export default router;