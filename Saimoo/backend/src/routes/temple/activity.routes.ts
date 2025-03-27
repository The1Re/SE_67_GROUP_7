import { Router,Request } from "express";
import * as TempleActivityController from "../../controllers/temple/templeActivity.controller";

declare module "express-serve-static-core" {
    interface Request {
        locationId?: string;
    }
    interface AuthRequest extends Request {
        locationId?: string;
    }
}

const router = Router();

router.use((req, res, next) => {
    const locationId = req.baseUrl.split('/').reverse()[1];
    console.log("Extracted locationId:", locationId);
    req.locationId = locationId;
    console.log("Updated req.locationId:", req.locationId); // Debugging
    next();
});

router.post('/', TempleActivityController.createTempleActivityController);
router.get('/', TempleActivityController.getTempleActivityController);
router.get('/:id', TempleActivityController.getTempleActivityByIdController);
router.put('/:id', TempleActivityController.updateTempleActivityController);
router.delete('/:id', TempleActivityController.deleteTempleActivityController);

export default router;