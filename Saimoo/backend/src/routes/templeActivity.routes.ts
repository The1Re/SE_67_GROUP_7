import { Router } from "express";
import { createTempleActivityController,getTempleActivityController,updateTempleActivityController,deleteTempleActivityController } from "../controllers/templeActivity.controller";

const router = Router();

router.post('/createTempleActivity', createTempleActivityController);
router.get('/showTempleActivity', getTempleActivityController);
router.put('/updateTempleActivity', updateTempleActivityController);
router.delete('/deleteTempleActivity', deleteTempleActivityController);

export default router;

