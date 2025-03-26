import { Router } from 'express';

import * as TripController from '../controllers/trip.controller';

const router = Router();

router.get('/', TripController.getAllTrips);
router.get('/history', TripController.getAllTripByUser);
router.get('/:id', TripController.getTrip);
router.post('/', TripController.newTrip);
router.put('/', TripController.updateTrip);
router.delete('/', TripController.removeTrip);

router.use('/:tripId/images', Router({ mergeParams: true })
    .get('/', TripController.getImages)
    .post('/', TripController.uploadImage)
    .put('/', TripController.updateImage)
    .delete('/', TripController.deleteImage)
)

router.use('/:tripId/details', Router({ mergeParams: true })
    .get('/', TripController.getTripDetails)
    .post('/', TripController.newTripDetail)
    .put('/', TripController.updateTripDetail)
    .delete('/', TripController.removeTripDetail)

    .use('/:tripDetailId/images', Router({ mergeParams: true })
        .get('/', TripController.getTripDetailImages)
        .post('/', TripController.uploadTripDetailImage)
        .put('/', TripController.updateTripDetailImage)
        .delete('/', TripController.removeTripDetailImage)
    )
)


export default router;