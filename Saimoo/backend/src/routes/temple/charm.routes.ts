import { Router,Request } from "express";
import * as TempleCharmController from "../../controllers/temple/templeCharm.controller";

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
router.get('/', TempleCharmController.getTempleCharmController) //yes
router.get('/:charmId', TempleCharmController.getTempleCharmByIdController) //yes
router.post('/', TempleCharmController.newTempleCharmController); //yes
router.put('/:charmId', TempleCharmController.updateTempleCharmController); //yes
router.delete('/:charmId', TempleCharmController.deleteTempleCharmController); //yes

export default router;