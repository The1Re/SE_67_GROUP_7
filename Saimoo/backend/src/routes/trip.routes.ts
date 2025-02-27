import { Router } from 'express';
import * as TripController from '../controllers/trip.controller';

const router = Router();

router.get('/', TripController.getAllTrips);
router.get('/:id', TripController.getTrip);
router.post('/', TripController.newTrip);
router.put('/');
router.delete('/', TripController.removeTrip);

export default router;