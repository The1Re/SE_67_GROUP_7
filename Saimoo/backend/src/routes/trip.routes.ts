import { Router } from 'express';
import { getAllTrips, getTrip, newTrip, removeTrip } from '../controllers/trip.controller';

const router = Router();

router.get('/', getAllTrips);
router.get('/:id', getTrip);
router.post('/', newTrip);
router.put('/');
router.delete('/', removeTrip);

export default router;