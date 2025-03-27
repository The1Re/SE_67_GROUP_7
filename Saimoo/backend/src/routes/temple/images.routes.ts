import { Router,Request } from "express";
import * as TempleImageController from "../../controllers/temple/templeImage.controller";

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

router.post('/', TempleImageController.newTempleImageController);
router.get('/', TempleImageController.getTempleImageController);
router.get('/:imgId', TempleImageController.getTempleImageByIdController);
router.put('/:imgId', TempleImageController.updateTempleImageController);
router.delete('/:imgId', TempleImageController.deleteTempleImageController);

export default router;