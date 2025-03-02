import { Request, Response } from "express";
import logger from "../utils/logger";

import type { TripData } from "../services/trip.service";

import * as TripService from "../services/trip.service";

export const getAllTrips = async (req: Request, res: Response): Promise<any> => {
    try {
        const { page = '1', pageSize = '10', sortBy = 'id', sortOrder = 'desc' } = req.query;
        const pageNumber = parseInt(page as string) || 1;
        const size = parseInt(pageSize as string) || 10;

        const trips = await TripService.getTripAvailable(pageNumber, size, sortBy as string, sortOrder as 'asc' | 'desc');
        return res.status(200).json(trips);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
} 

export const getTrip = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const trip = await TripService.getTripById(Number(id));
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }
        return res.status(200).json(trip);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const newTrip = async (req: Request, res: Response): Promise<any> => {
    try {
        const tripData: TripData = req.body;
        const { title, dateStart, dateEnd, ownerTripId } = tripData;
        
        if (!title || !dateStart || !dateEnd || !ownerTripId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const trip = await TripService.createTrip(tripData);
        return res.status(201).json(trip);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateTrip = async (req: Request, res: Response): Promise<any> => {
    try {
        const tripData: TripData = req.body;

        if (!tripData.id) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const trip = await TripService.updateTrip(tripData.id, tripData);
        return res.status(200).json(trip);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const removeTrip = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        await TripService.deleteTrip(Number(id));
        return res.status(204).json();
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getImages = async (req: Request, res: Response): Promise<any> => {
    try {
        const { tripId } = req.params;
        const images = await TripService.getImages(Number(tripId));
        return res.status(200).json(images);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const uploadImage = async (req: Request, res: Response): Promise<any> => {
    try {
        const { tripId } = req.params;
        const { imagePath } = req.body;
        const image = await TripService.uploadImage(Number(tripId), imagePath);
        return res.status(201).json(image);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateImage = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id, imagePath } = req.body;
        const image = await TripService.updateImage(Number(id), imagePath);
        return res.status(200).json(image);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteImage = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.body;
        await TripService.deleteImage(Number(id));
        return res.status(204).json({ message: "Image deleted" });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getTripDetails = async (req: Request, res: Response): Promise<any> => {
    try {
        const { tripId } = req.params;
        const details = await TripService.getTripDetails(Number(tripId));
        return res.status(200).json(details);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const newTripDetail = async (req: Request, res: Response): Promise<any> => {
    try {
        const { tripId } = req.params;
        const tripDetail = req.body;
        const detail = await TripService.newTripDetail(Number(tripId), tripDetail);
        return res.status(201).json(detail);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateTripDetail = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.body;
        const tripDetail = req.body;
        const detail = await TripService.updateTripDetail(Number(id), tripDetail);
        return res.status(200).json(detail);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const removeTripDetail = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.body;
        await TripService.removeTripDetail(Number(id));
        return res.status(204).json({ message: "Trip detail removed" });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getTripDetailImages = async (req: Request, res: Response): Promise<any> => {
    try {
        const { tripDetailId } = req.params;
        const images = await TripService.getTripDetailImages(Number(tripDetailId));
        return res.status(200).json(images);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const uploadTripDetailImage = async (req: Request, res: Response): Promise<any> => {
    try {
        const { tripDetailId } = req.params;
        const { imagePath } = req.body;
        const image = await TripService.uploadTripDetailImage(Number(tripDetailId), imagePath);
        return res.status(201).json(image);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateTripDetailImage = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id, imagePath } = req.body;
        const image = await TripService.updateTripDetailImage(Number(id), imagePath);
        return res.status(200).json(image);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const removeTripDetailImage = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.body;
        await TripService.removeTripDetailImage(Number(id));
        return res.status(204).json({ message: "Trip detail image removed" });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
