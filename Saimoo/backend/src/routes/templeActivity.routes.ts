import { Router } from "express";
import { createTempleActivityController,getTempleActivityController,updateTempleActivityController,deleteTempleActivityController,getTempleActivityByIdController } from "../controllers/templeActivity.controller";

const router = Router();

router.post('/create', createTempleActivityController);
router.get('/show', getTempleActivityController);
router.get('/:id',getTempleActivityByIdController);
router.put('/update', updateTempleActivityController);
router.delete('/delete', deleteTempleActivityController);

export default router;

