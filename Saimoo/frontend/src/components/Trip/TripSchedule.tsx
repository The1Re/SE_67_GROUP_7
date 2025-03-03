import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TripSchedule = ({ startDate, setStartDate, endDate, setEndDate }) => {
    const calculateDays = () => {
        if (!startDate || !endDate) return "[Day]";
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return `[Day ${diffDays}]`;
    };

    return (
        <div className="p-4 rounded-lg">
            <p className="font-bold">
                กำหนดการ {startDate && endDate ? `${startDate.toLocaleDateString()} ถึง ${endDate.toLocaleDateString()}` : "เลือกวันที่"} {calculateDays()}
            </p>
            <div className="flex space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                    <span>📅</span>
                    <DatePicker 
                        selected={startDate} 
                        onChange={(date: Date) => setStartDate(date)}
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
                        onChange={(date: Date) => setEndDate(date)}
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
