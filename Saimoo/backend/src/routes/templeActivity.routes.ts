import { Router } from "express";
import { createTempleActivityController,getTempleActivityController } from "../controllers/templeActivity.controller";

const router = Router();

router.post('/createTempleActivity', createTempleActivityController);
router.get('/showTempleActivity', getTempleActivityController);

export default router;

