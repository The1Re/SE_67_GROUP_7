import { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import TripSchedule from "./TripSchedule";
import TransportationSelect from "./TransportationSelect";
import TripDescription from "./TripDescription";
import { Day } from "@/types/trip"; // ⬅️ ใช้ type กลาง

type TripDetailsProps = {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  setDays: React.Dispatch<React.SetStateAction<Day[]>>;
  transportation: string;
  setTransportation: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
};

const TripDetails: React.FC<TripDetailsProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setDays,
  transportation,
  setTransportation,
  description,
  setDescription,
}) => {
  const [title, setTitle] = useState(""); // 🆕 เพิ่ม state สำหรับหัวข้อ

  // 👉 หากต้องการให้หัวข้อจำค่าได้ (เช่น ใช้ sessionStorage)
  useEffect(() => {
    const savedTitle = sessionStorage.getItem("tripTitle");
    if (savedTitle) setTitle(savedTitle);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("tripTitle", title);
  }, [title]);

  return (
    <div className="bg-white rounded-lg space-y-4">
      <UserInfo />
      <input
        type="text"
        placeholder="หัวข้อ"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
      <TripSchedule
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        setDays={setDays}
      />
      <TransportationSelect
        transportation={transportation}
        setTransportation={setTransportation}
      />
      <TripDescription
        description={description}
        setDescription={setDescription}
      />
    </div>
  );
};

export default TripDetails;
