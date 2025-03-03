import { useState } from "react";

const TripDay = ({ totalDays }) => {
    const [activeTab, setActiveTab] = useState(1);
    const [locations, setLocations] = useState([{}]);

    const addLocation = () => {
        setLocations([...locations, {}]);
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            {/* แท็บ Day 1, Day 2 */}
            <div className="flex space-x-2 mb-4">
                {Array.from({ length: totalDays }, (_, index) => (
                    <button 
                        key={index} 
                        className={`px-4 py-2 rounded-lg ${activeTab === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
                        onClick={() => setActiveTab(index + 1)}
                    >
                        Day {index + 1}
                    </button>
                ))}
            </div>

            {/* จุดนัดพบ (เฉพาะ Day 1) */}
            {activeTab === 1 && (
                <div className="mb-4">
                    <p className="font-bold">จุดนัดพบ</p>
                    <button className="w-full h-12 bg-gray-300 flex items-center justify-center rounded-lg">
                        +
                    </button>
                </div>
            )}

            {/* รายการสถานที่ */}
            <div className="space-y-4">
                {locations.map((_, index) => (
                    <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                        <p className="font-bold">เพิ่มสถานที่</p>
                        <button className="w-full h-12 bg-gray-300 flex items-center justify-center rounded-lg mb-2">
                            +
                        </button>
                        <textarea className="w-full p-2 border rounded-lg" placeholder="คำอธิบาย"></textarea>
                        
                        {/* Dropdown เวลา */}
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
                        
                        {/* อัปโหลดรูปภาพ */}
                        <div className="mt-2 flex space-x-2 overflow-x-auto">
                            <button className="w-24 h-24 bg-gray-300 flex items-center justify-center rounded-lg">
                                +
                            </button>
                            {/* เพิ่มฟังก์ชันแสดง preview และลูกศรเลื่อนภาพในอนาคต */}
                        </div>
                    </div>
                ))}
            </div>
            
            {/* ปุ่มเพิ่มสถานที่ */}
            <button 
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg" 
                onClick={addLocation}
            >
                เพิ่มสถานที่
            </button>
        </div>
    );
};

export default TripDay;
