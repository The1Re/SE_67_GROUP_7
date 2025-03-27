import { useCallback, useState } from "react";
import MyMap from "@/components/map/MyMap";
import Image from "@/components/tripdetail/Image";
import TripCard from "@/components/tripdetail/TripCard";
import TripDayDetail from "@/components/tripdetail/TripDayDetail";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import api from "@/api";

function TripDetail() {
  const { tripId } = useParams();
  const tripIdNumber = tripId ? parseInt(tripId) : undefined;
  const [locations, setLocations] = useState<{ location: { lat: number; lng: number } }[]>([]);
  
    useEffect(() => {
    const fetchTripDetails = async () => {
      if (!tripIdNumber) return;
      
      try {
        const response = await api.get(`/trips/${tripIdNumber}`);
        console.log("Trip details:", response.data);
      } catch (error) {
        console.error("Error fetching trip details:", error);
      }
    };
    
    fetchTripDetails();
  }, [tripIdNumber]);

  // ✅ ห่อด้วย useCallback เพื่อความเสถียร
  const handleDayLocationChange = useCallback((dayLocations: { location: { lat: number; lng: number } }[]) => {
    setLocations(dayLocations);
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-4/6 flex flex-col">
        <Image tripId={tripIdNumber} />
        <div className="w-full bg-white px-8">
          <TripCard tripId={tripIdNumber} />
          <TripDayDetail onChangeActiveDay={handleDayLocationChange} />
        </div>
      </div>

      <div className="hidden md:flex w-2/6 h-screen bg-gray-200 items-center justify-center sticky top-0">
        <MyMap locations={locations} />
      </div>
    </div>
  );
}

export default TripDetail;
