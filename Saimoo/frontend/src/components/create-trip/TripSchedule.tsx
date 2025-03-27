import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useTrip } from "@/context/TripContext";
import { convertDateTimeToThaiFormat } from "@/utils/TimeFormat";

function TripSchedule() {
    const {trip, setTrip, numDay} = useTrip();
    const startDate = trip.dateStart;
    const endDate = trip.dateEnd;

    const handleTimeChange = (event: Date | null, isStartDate: boolean) => {
        if (isStartDate) {
            if (event && event > endDate) {
                setTrip({ ...trip, dateStart: event, dateEnd: event });
            } else {
                setTrip({ ...trip, dateStart: event });
            }
        } else {
            if (event && event < startDate) {
                setTrip({ ...trip, dateStart: event, dateEnd: event });
            } else {
                setTrip({ ...trip, dateEnd: event });
            }
        }
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
                        onChange={(date: Date | null) => handleTimeChange(date, true)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="MMMM d, yyyy HH:mm"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-56"
                        placeholderText="Select start date and time"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="text-gray-600">📅 วันที่กลับ</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date: Date | null) => handleTimeChange(date, false)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="MMMM d, yyyy HH:mm"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-56"
                        placeholderText="Select start date and time"
                    />
                </div>
            </div>
        </div>
    );
};

export default TripSchedule;
