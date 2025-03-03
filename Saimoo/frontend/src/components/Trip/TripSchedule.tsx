import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface TripScheduleProps {
    startDate: Date | null;
    setStartDate: (date: Date | null) => void;
    endDate: Date | null;
    setEndDate: (date: Date | null) => void;
    setDays: (days: { id: number; locations: {}[] }[]) => void;
}

const TripSchedule: React.FC<TripScheduleProps> = ({ startDate, setStartDate, endDate, setEndDate, setDays }) => {
    useEffect(() => {
        if (startDate && endDate) {
            const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            setDays(Array.from({ length: diffDays }, (_, i) => ({ id: i + 1, locations: [{}] })));
        }
    }, [startDate, endDate, setDays]);

    return (
        <div className="p-4 rounded-lg">
            <p className="font-bold">
                กำหนดการ {startDate && endDate ? `${startDate.toLocaleDateString()} ถึง ${endDate.toLocaleDateString()}` : "เลือกวันที่"}
            </p>
            <div className="flex space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                    <span>📅</span>
                    <DatePicker 
                        selected={startDate} 
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        showTimeSelect
                        dateFormat="Pp"
                        placeholderText="วันที่ไป"
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <span>📅</span>
                    <DatePicker 
                        selected={endDate} 
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        showTimeSelect
                        dateFormat="Pp"
                        placeholderText="วันที่กลับ"
                        className="p-2 border border-gray-300 rounded-lg relative z-50"
                    />
                </div>
            </div>
        </div>
    );
};

export default TripSchedule;
