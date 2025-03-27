import MyMap from "@/components/map/MyMap";
import Image from "@/components/tripdetail/Image";
import TripCard from "@/components/tripdetail/TripCard";
import TripDayDetail from "@/components/tripdetail/TripDayDetail";
import { useEffect, useState } from "react";

function TripDetail() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [days, setDays] = useState([]); // สำหรับ TripDayDetail
  const [locations] = useState([]); // สำหรับ MyMap
  const [transportation, setTransportation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageURL, setImageURL] = useState<string | null>(null); // สำหรับภาพปก

  // ✅ โหลดข้อมูลจาก sessionStorage
  useEffect(() => {
    const savedStart = sessionStorage.getItem("startDate");
    const savedEnd = sessionStorage.getItem("endDate");
    const savedDays = sessionStorage.getItem("tripDays");
    const savedTrans = sessionStorage.getItem("transportation");
    const savedDesc = sessionStorage.getItem("description");
    const savedImage = sessionStorage.getItem("imageURL");

    if (savedStart) setStartDate(new Date(savedStart));
    if (savedEnd) setEndDate(new Date(savedEnd));
    if (savedDays) setDays(JSON.parse(savedDays));
    if (savedTrans) setTransportation(savedTrans);
    if (savedDesc) setDescription(savedDesc);
    if (savedImage) setImageURL(savedImage);
  }, []);

  // 🔁 เก็บค่าล่าสุดกลับเข้า sessionStorage (ถ้าต้องการ)
  useEffect(() => {
    if (startDate) sessionStorage.setItem("startDate", startDate.toString());
    if (endDate) sessionStorage.setItem("endDate", endDate.toString());
    sessionStorage.setItem("tripDays", JSON.stringify(days));
    sessionStorage.setItem("transportation", transportation);
    sessionStorage.setItem("description", description);
    if (imageURL) sessionStorage.setItem("imageURL", imageURL);
  }, [startDate, endDate, days, transportation, description, imageURL]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-4/6 flex flex-col">
        {/* 👇 ส่ง imageURL ไปให้ Image component ถ้าอยากให้แสดงรูปเดิม */}
        <Image imageURL={imageURL} />
        <div className="w-full bg-white px-8">
          <TripCard
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            transportation={transportation}
            description={description}
          />
          <TripDayDetail days={days} />
        </div>
      </div>

      <div className="hidden md:flex w-2/6 h-screen bg-white items-center justify-center sticky top-0">
        <MyMap locations={locations} />
      </div>
    </div>
  );
}

export default TripDetail;
