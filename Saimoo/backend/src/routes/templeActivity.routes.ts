import { Router } from "express";
import { createTempleActivityController,getTempleActivityController,updateTempleActivityController,deleteTempleActivityController,getTempleActivityByIdController } from "../controllers/templeActivity.controller";

const router = Router();

router.post('/createTempleActivity', createTempleActivityController);
router.get('/showTempleActivity', getTempleActivityController);
router.get('/getOneTempleActivity/:id',getTempleActivityByIdController);
router.put('/updateTempleActivity', updateTempleActivityController);
router.delete('/deleteTempleActivity', deleteTempleActivityController);

export default router;

