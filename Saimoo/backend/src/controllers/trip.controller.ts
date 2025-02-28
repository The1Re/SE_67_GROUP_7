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