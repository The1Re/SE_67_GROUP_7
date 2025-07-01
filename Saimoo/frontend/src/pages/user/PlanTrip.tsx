import MyMap from "@/components/map/MyMap";
import TripDay from "@/components/Trip/TripDay";
import TripDetails from "@/components/Trip/TripDetails";
import UploadImage from "@/components/Trip/UploadImage";
import { useEffect, useState, useRef } from "react";
import { TripProvider } from "@/context/TripContext";


function PlanTrip() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [days, setDays] = useState([]);
  const [locations, setLocations] = useState([]);
  const [transportation, setTransportation] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState<string | null>(null);
  const hasLoadedDays = useRef(false);

  // โหลดจาก sessionStorage เมื่อ component mount
  useEffect(() => {
    const savedStart = sessionStorage.getItem("startDate");
    const savedEnd = sessionStorage.getItem("endDate");
    const savedDays = sessionStorage.getItem("tripDays");
    const savedTrans = sessionStorage.getItem("transportation");
    const savedDesc = sessionStorage.getItem("description");
    const savedImage = sessionStorage.getItem("tripImage");

    if (savedStart) setStartDate(new Date(savedStart));
    if (savedEnd) setEndDate(new Date(savedEnd));
    if (savedDays) setDays(JSON.parse(savedDays));
    if (savedTrans) setTransportation(savedTrans);
    if (savedDesc) setDescription(savedDesc);
    if (savedImage) setImageURL(savedImage);
    hasLoadedDays.current = true;
  }, []);

  // บันทึกลง sessionStorage เมื่อค่ามีการเปลี่ยน
  useEffect(() => {
    if (startDate) sessionStorage.setItem("startDate", startDate.toString());
    if (endDate) sessionStorage.setItem("endDate", endDate.toString());
    sessionStorage.setItem("tripDays", JSON.stringify(days));
    sessionStorage.setItem("transportation", transportation);
    sessionStorage.setItem("description", description);
    if (imageURL) sessionStorage.setItem("tripImage", imageURL);
  }, [startDate, endDate, days, transportation, description, imageURL]);

  return (
    <TripProvider>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-4/6 flex flex-col">
          <UploadImage imageURL={imageURL} setImageURL={setImageURL} />
          <div className="p-4 px-32 bg-white">
            <TripDetails
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              setDays={setDays}
              transportation={transportation}
              setTransportation={setTransportation}
              description={description}
              setDescription={setDescription}
            />
            <TripDay
              startDate={startDate}
              endDate={endDate}
              setLocations={setLocations}
              days={days}
              setDays={setDays}
            />
          </div>
        </div>
        <div className="hidden md:flex w-2/6 h-screen bg-gray-200 items-center justify-center sticky top-0">
          <MyMap locations={locations} />
        </div>
      </div>
    </TripProvider>
  );
}

export default PlanTrip;
