import { Request, Response } from "express";    
import { createReview,getReview,getReviewById,updateReview,deleteReview, updateRating,getReviewOrderByRating,getReviewOrderByDate} from "../services/guideService";
import logger from './../utils/logger';
import { AuthRequest } from './../middlewares/authenticateUser.middleware';

export const createReviewController = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { comment, userId, guideId } = req.body;
        const review = await createReview({comment, userId, guideId});
        return res.status(201).json(review);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not create' });
    }
};

export const getReviewController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { guideId } = req.params;
        const review = await getReview(Number(guideId));
        return res.status(200).json(review);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not get' });
    }
};

export const getReviewOrderByRatingController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { guideId } = req.params;
        const review = await getReviewOrderByRating(Number(guideId));
        return res.status(200).json(review);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not get' });
    }
};

export const getReviewOrderByDateController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { guideId } = req.params;
        const review = await getReviewOrderByDate(Number(guideId));
        return res.status(200).json(review);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not get' });
    }
};

export const getReviewByIdController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const review = await getReviewById(Number(id));
        return res.status(200).json(review);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not get' });
    }
};

export const updateReviewController = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const review = await updateReview(Number(id), { comment });
        return res.status(200).json(review);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not update' });
    }
};

export const deleteReviewController = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const review = await deleteReview(Number(id));
        return res.status(200).json(review);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not delete' });
    }
};

export const updateRatingController = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { rating } = req.body;
        const review = await updateRating(Number(id), rating );
        return res.status(200).json(review);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Can not update' });
    }
};
 

