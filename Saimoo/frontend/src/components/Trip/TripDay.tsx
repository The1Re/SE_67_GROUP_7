import { useState, useEffect } from "react";

const TripDay = ({ startDate, endDate }) => {
    const [days, setDays] = useState([]);
    const [activeTab, setActiveTab] = useState(1);

    useEffect(() => {
        if (startDate && endDate) {
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            setDays(Array.from({ length: diffDays }, (_, i) => ({ 
                id: i + 1, 
                locations: i === 0 ? [{ type: "meeting_point" }] : [{ type: "location" }] 
            })));
        }
    }, [startDate, endDate]);

    const addLocation = (dayId) => {
        setDays(days.map(day => {
            if (day.id === dayId) {
                return { ...day, locations: [...day.locations, { type: "location" }] };
            }
            return day;
        }));
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex space-x-2 mb-4">
                {days.map((day) => (
                    <button 
                        key={day.id} 
                        className={`cursor-pointer px-4 py-2 rounded-lg ${activeTab === day.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
                        onClick={() => setActiveTab(day.id)}
                    >
                        Day {day.id}
                    </button>
                ))}
            </div>

            {days.map((day) => (
                activeTab === day.id && (
                    <div key={day.id} className="space-y-4">
                        {day.locations.map((location, index) => (
                            <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                                <p className="font-bold">
                                    {location.type === "meeting_point" ? "จุดนัดพบ" : "เพิ่มสถานที่"}
                                </p>
                                <button className="w-full h-12 bg-gray-300 flex items-center justify-center rounded-lg mb-2">
                                    +
                                </button>
                                <textarea className="w-full p-2 border rounded-lg" placeholder="คำอธิบาย"></textarea>
                                <select className="w-full p-2 border rounded-lg mt-2">
                                    <option>เลือกเวลา</option>
                                    {[...Array(24)].map((_, h) => (
                                        [...Array(2)].map((_, m) => (
                                            <option key={`${h}:${m * 30}`}>
                                                {`${h}:${m * 30 === 0 ? '00' : '30'} AM`}
                                            </option>
                                        ))
                                    ))}
                                </select>
                                <div className="mt-2 flex space-x-2 overflow-x-auto">
                                    <button className="w-24 h-24 bg-gray-300 flex items-center justify-center rounded-lg">
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button 
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg" 
                            onClick={() => addLocation(day.id)}
                        >
                            เพิ่มสถานที่
                        </button>
                    </div>
                )
            ))}
        </div>
    );
};

export default TripDay;
