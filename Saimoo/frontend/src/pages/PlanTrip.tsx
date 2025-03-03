import MapView from "@/components/Trip/MapView";
import TripDay from "@/components/Trip/TripDay";
import TripDetails from "@/components/Trip/TripDetails";
import UploadImage from "@/components/Trip/UploadImage";
import { useState } from "react";

function PlanTrip() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [days, setDays] = useState([]);

  return (
    <div className="mt-9 flex flex-col md:flex-row">
      {/* คอลัมน์ซ้าย (เนื้อหาหลัก) */}
      <div className="w-full md:w-4/6 flex flex-col">
          <UploadImage />
          <TripDetails 
              startDate={startDate} 
              setStartDate={setStartDate} 
              endDate={endDate} 
              setEndDate={setEndDate} 
              setDays={setDays} 
          />
          <TripDay days={days} setDays={setDays} startDate={startDate} endDate={endDate} />
      </div>

      {/* คอลัมน์ขวา (แผนที่) ✅ ใช้ sticky ทำให้ไม่เลื่อนตาม */}
      <div className="hidden md:flex w-2/6 h-screen bg-green-500 items-center justify-center sticky top-0">
          <MapView />
      </div>
    </div>
  );
}

export default PlanTrip;
