import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import MyMap from "@/components/map/MyMap";
import Image from "@/components/tripdetail/Image";
import TripCard from "@/components/tripdetail/TripCard";
import TripDayDetail from "@/components/tripdetail/TripDayDetail";

function TripDetail() {
  const { id } = useParams();
  const tripId = Number(id);
  const [locations, setLocations] = useState<{ location: { lat: number; lng: number } }[]>([]);

  // ✅ ห่อด้วย useCallback เพื่อความเสถียร
  const handleDayLocationChange = useCallback((dayLocations: { location: { lat: number; lng: number } }[]) => {
    setLocations(dayLocations);
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-4/6 flex flex-col">
        <Image tripId={tripId} />
        <div className="w-full bg-white px-8">
          <TripCard tripId={tripId} />
          <TripDayDetail onChangeActiveDay={handleDayLocationChange} />
        </div>
      </div>

      <div className="hidden md:flex w-2/6 h-screen bg-green-300 items-center justify-center sticky top-0">
        <MyMap locations={locations} />
      </div>
    </div>
  );
}

export default TripDetail;
