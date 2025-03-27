import { Trip, TripDetail } from "@/models/Trip";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useLocation } from "react-router-dom";

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
};

// ✅ ตรวจสอบการแปลง dateStart และ dateEnd ให้เป็น Date เสมอ
const getState = (clonedTrip) => {
  const state = clonedTrip || JSON.parse(sessionStorage.getItem("trip")) as Trip;
  if (state) {
    state.dateStart = new Date(state.dateStart);
    state.dateEnd = new Date(state.dateEnd);
    state.TripDetail = state.TripDetail.map((detail) => ({
      ...detail,
      arriveTime: new Date(detail.arriveTime),
    }));
  }
  return state || initTripValue;
};

const TripContext = createContext(null);

export const TripProvider = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation(); // ✅ ใช้ useLocation เพื่อรับ state จาก History
  const clonedTrip = location.state?.clonedTrip || null; // ✅ รับข้อมูล clonedTrip

  const [trip, setTrip] = useState<Trip>(
    getState(clonedTrip) || { ...initTripValue, ownerTripId: user.id }
  );

  const [numDay, setNumDay] = useState(1);

  const setTripDetail = useCallback((day: number, tripDetail: TripDetail[]) => {
    setTrip((prev) => {
      const updatedTrip = {
        ...prev,
        TripDetail: prev.TripDetail.filter((detail) => detail.day !== day).concat(tripDetail),
      };
      return updatedTrip;
    });
    console.log(trip);
  }, []);

  const saveState = () => {
    sessionStorage.setItem("trip", JSON.stringify(trip));
  };

  const clearState = () => {
    sessionStorage.removeItem("trip");
  };

  useEffect(() => {
    if (trip.dateStart && trip.dateEnd) {
      const diffTime = Math.abs(trip.dateStart.getTime() - trip.dateEnd.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setNumDay(diffDays);
    }
  }, [trip.dateStart, trip.dateEnd]);

  return (
    <TripContext.Provider value={{ trip, setTrip, setTripDetail, numDay, saveState, clearState }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () =>
  useContext<{
    trip: Trip;
    setTrip: React.Dispatch<React.SetStateAction<Trip>>;
    setTripDetail: (day: number, tripDetail: TripDetail[]) => void;
    saveState: () => void;
    clearState: () => void;
    numDay: number;
  }>(TripContext);
