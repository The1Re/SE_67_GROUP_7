import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api";
import MyMap from "@/components/map/MyMap";
import Image from "@/components/tripdetail/Image";
import TripCard from "@/components/tripdetail/TripCard";
import TripDayDetail from "@/components/tripdetail/TripDayDetail";

function TripDetail() {
  const { id } = useParams();
  const [locations, setLocations] = useState<{ location: { lat: number; lng: number } }[]>([]);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/trips/${id}`);
        const tripDetails = res.data.TripDetail || [];

        const locationPoints = tripDetails
          .filter((detail: any) => detail.Location) // ตรวจสอบว่ามี Location
          .map((detail: any) => ({
            location: {
              lat: detail.Location.latitude,
              lng: detail.Location.longitude,
            },
          }));

        setLocations(locationPoints);
      } catch (err) {
        console.error("ไม่สามารถโหลด Trip ได้", err);
      }
    };

    fetchTrip();
  }, [id]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-4/6 flex flex-col">
        <Image />
        <div className=" w-full bg-white px-8">
          <TripCard />
          <TripDayDetail />
        </div>
      </div>

      {/* ✅ ส่งข้อมูล locations เข้า MyMap */}
      <div className="hidden md:flex w-2/6 h-screen bg-green-300 items-center justify-center sticky top-0">
        <MyMap locations={locations} />
      </div>
    </div>
  );
}

export default TripDetail;
