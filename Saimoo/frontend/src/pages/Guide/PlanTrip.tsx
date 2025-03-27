import MyMap from "@/components/map/MyMap";
import TripDay from "@/components/Trip/TripDay";
import TripDetails from "@/components/Trip/TripDetails";
import UploadImage from "@/components/Trip/UploadImage";
import { useState } from "react";

function PlanTrip() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [locations, setLocations] = useState([]); // ✅ เก็บข้อมูลสถานที่ที่เพิ่ม
  const setDays = useState([])[1];

  return (
    <div className="flex flex-col md:flex-row">
      {/* คอลัมน์ซ้าย (เนื้อหาหลัก) */}
      <div className="w-full md:w-4/6 flex flex-col">
          <UploadImage />
          <div className="p-4 px-32 bg-white">
            <TripDetails 
                startDate={startDate} 
                setStartDate={setStartDate} 
                endDate={endDate} 
                setEndDate={setEndDate} 
                setDays={setDays} 
            />
            <TripDay startDate={startDate} endDate={endDate} setLocations={setLocations} /> {/* ✅ ส่ง setLocations */}
          </div>
      </div>

      {/* คอลัมน์ขวา (แผนที่) */}
      <div className="hidden md:flex w-2/6 h-screen bg-green-500 items-center justify-center sticky top-0">
          <MyMap locations={locations} /> {/* ✅ ส่ง locations ไปให้ MyMap */}
      </div>
    </div>
  );
}

export default PlanTrip;
