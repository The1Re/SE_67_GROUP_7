import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useTrip } from "@/context/TripContext";
import { convertDateTimeToThaiFormat } from "@/utils/TimeFormat";

function TripSchedule() {
    const {trip, setTrip, numDay} = useTrip();
    const startDate = trip.dateStart;
    const endDate = trip.dateEnd;

    const handleTimeChange = (time: string, prevDate: Date, isStartDate: boolean) => {
        const [hour, minute] = time.split(":").map(Number);
        const newDate = new Date(prevDate || new Date());
        newDate.setHours(hour, minute);
        if (isStartDate)
            setTrip({ ...trip, dateStart: newDate });
        else
            setTrip({ ...trip, dateEnd: newDate });
    };

    return (
        <div className="rounded-lg bg-white p-4 shadow-md">
            <p className="font-bold text-gray-700">
                กำหนดการ{" "}
                {startDate && endDate
                    ? `${convertDateTimeToThaiFormat(startDate, false)} ถึง ${convertDateTimeToThaiFormat(endDate, false)}`
                    : "เลือกวันที่"}
                {numDay > 0 && ` | Day ${numDay}`}
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
                <div className="flex flex-col space-y-2">
                    <label className="text-gray-600">📅 วันที่ไป</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date: Date | null) => setTrip({ ...trip, dateStart: date })}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="MMMM d, yyyy"
                        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-56"
                        placeholderText="เลือกวันที่"
                    />
                    <TimePicker
                        onChange={(e) => handleTimeChange(e, startDate, true)}
                        value={startDate? startDate.toISOString().substring(11, 16) : ""}
                        format="HH:mm a"
                        disableClock
                        clearIcon={null}
                        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-56"
                    />

                </div>
                <div className="flex flex-col space-y-2">
                    <label className="text-gray-600">📅 วันที่กลับ</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date: Date | null) => setTrip({ ...trip, dateEnd: date })}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        dateFormat="MMMM d, yyyy"
                        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-56"
                        placeholderText="เลือกวันที่"
                    />
                    <TimePicker
                        onChange={(e) => handleTimeChange(e, endDate, false)}
                        value={endDate ? endDate.toISOString().substring(11, 16) : ""}
                        format="HH:mm a"
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
