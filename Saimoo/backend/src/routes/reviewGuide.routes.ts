import { Router } from "express";
import {createReviewController,getReviewController,updateReviewController,deleteReviewController,updateRatingController, getReviewOrderByRatingController, getReviewOrderByDateController} from "../controllers/reviewGuide.controller";

const router = Router();

router.post('/', createReviewController);
router.get('/:guideId', getReviewController);
router.get('/rating/:guideId', getReviewOrderByRatingController);
router.get('/date/:guideId', getReviewOrderByDateController);
router.put('/:id', updateReviewController);
router.put('/rating/:id', updateRatingController);
router.delete('/:id', deleteReviewController);
router.put('/rating/:id', updateRatingController);

export default router;