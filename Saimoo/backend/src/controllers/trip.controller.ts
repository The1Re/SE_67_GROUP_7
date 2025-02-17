import { Request, Response } from "express";
import { 
    getTripAvailable, 
    getTripById, 
    createTrip, 
    deleteTrip, 
    updateTrip
} from "../services/trip.service";
import logger from "../utils/logger";

import type { Trip, TripDetail } from "@prisma/client";
import type { TripData } from "../services/trip.service";

export const getAllTrips = async (req: Request, res: Response): Promise<any> => {
    try {
        const trips = await getTripAvailable();
        return res.status(200).json(trips);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
} 

export const getTrip = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const trip = await getTripById(Number(id));
        return res.status(200).json(trip);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const newTrip = async (req: Request, res: Response): Promise<any> => {
    try {
        const tripData: TripData = req.body;
        const trip = await createTrip(tripData);
        return res.status(201).json(trip);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const removeTrip = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        await deleteTrip(Number(id));
        return res.status(204).json();
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}