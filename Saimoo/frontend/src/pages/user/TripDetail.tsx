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

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-4/6 flex flex-col">
        <Image/>
        <div className="w-full bg-white px-8">
          {/* ส่ง tripId ไปให้ TripCard เพื่อใช้ในการดึงข้อมูล */}
          <TripCard />
          {/* ส่ง tripId ไปให้ TripDayDetail เพื่อใช้ในการดึงข้อมูล */}
          <TripDayDetail />
        </div>
      </div>

      {/* คอลัมน์ขวา (แผนที่) ✅ ใช้ sticky ทำให้ไม่เลื่อนตาม */}
      <div className="hidden md:flex w-2/6 h-screen bg-green-300 items-center justify-center sticky top-0">
        <MyMap locations={undefined} />
      </div>
    </div>
  );
}

export default TripDetail;
