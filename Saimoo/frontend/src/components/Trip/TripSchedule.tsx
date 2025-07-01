import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { Day } from "@/types/trip"; // ✅ นำเข้า Day จาก types

interface TripScheduleProps {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  setDays: (days: Day[]) => void; // ✅ ใช้ type Day[]
}

const TripSchedule: React.FC<TripScheduleProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setDays,
}) => {
  const [numDays, setNumDays] = useState(0);
  const [startTime, setStartTime] = useState("12:00 AM");
  const [endTime, setEndTime] = useState("12:00 AM");

  useEffect(() => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setNumDays(diffDays);

      const generatedDays: Day[] = Array.from({ length: diffDays }, (_, i) => ({
        id: i + 1,
        locations: [
          {
            id: `${i + 1}-meet`,
            name: "",
            address: "",
            lat: undefined,
            lng: undefined,
            images: [],
            thumbnail: null,
            description: "",
            time: "",
          },
        ],
      }));

      setDays(generatedDays);
    }
  }, [startDate, endDate, setDays]);

  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <p className="font-bold text-gray-700">
        กำหนดการ{" "}
        {startDate && endDate
          ? `${startDate.toLocaleDateString()} ถึง ${endDate.toLocaleDateString()}`
          : "เลือกวันที่"}
        {numDays > 0 && ` | Day ${numDays}`}
      </p>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600">📅 วันที่ไป</label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="MMMM d, yyyy"
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-56"
            placeholderText="เลือกวันที่"
          />
          <TimePicker
            onChange={setStartTime}
            value={startTime}
            format="h:mm a"
            disableClock
            clearIcon={null}
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-56"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-gray-600">📅 วันที่กลับ</label>
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="MMMM d, yyyy"
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-56"
            placeholderText="เลือกวันที่"
          />
          <TimePicker
            onChange={setEndTime}
            value={endTime}
            format="h:mm a"
            disableClock
            clearIcon={null}
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-56"
          />
        </div>
      </div>
    </div>
  );
};

export default TripSchedule;
