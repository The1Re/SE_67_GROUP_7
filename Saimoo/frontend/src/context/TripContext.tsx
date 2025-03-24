import { Trip } from "@/models/Trip";
import { createContext, useContext, useEffect, useState } from "react";

const initTripValue: Trip = {
    title: "",
    description: "",
    dateStart: new Date(),
    dateEnd: new Date(),
    vehicle: "van",
    maxPerson: 1,
    status: "waiting",
    ownerTripId: null,
    type: "free",
    price: 0,
    TripPicture: {
        imagePath: null,
    },
    TripDetail: [],
} 

const TripContext = createContext(null);

export const TripProvider = ({ children }) => {
    const [trip, setTrip] = useState<Trip>(initTripValue);
    const [numDay, setNumDay] = useState(1);
    
    useEffect(() => {
        if (trip.dateStart && trip.dateEnd) {
            const diffTime = Math.abs(trip.dateStart.getTime() - trip.dateEnd.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            setNumDay(diffDays);
        }
    }, [trip.dateStart, trip.dateEnd]);

    return (
        <TripContext.Provider value={{ trip, setTrip, numDay }}>
            {children}
        </TripContext.Provider>
    );
}


// eslint-disable-next-line react-refresh/only-export-components
export const useTrip = () => useContext<{ 
    trip: Trip, 
    setTrip: React.Dispatch<React.SetStateAction<Trip>>,
    numDay: number
}>(TripContext);