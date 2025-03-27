import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const UserInfo = () => {
    const { user } = useAuth();
    const [maxPeople, setMaxPeople] = useState(""); // ช่องให้พิมพ์จำนวนคน

    // ฟังก์ชันเมื่อกดปุ่มสร้าง
    const handleCreateTrip = () => {
        console.log(`สร้างทริปสำเร็จ! จำนวนคน: ${maxPeople || "จำนวนคนมากที่สุด"}`);
    };

    return (
        <div className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-md">
            {/* ข้อมูลผู้ใช้ */}
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full" /> {/* Mockup User Avatar */}
                <div>
                    <p className="font-bold">{user.username}</p>
                    <p className="text-gray-500 text-sm">สร้างเมื่อ 28 ต.ค. 2566</p>
                </div>
            </div>

            {/* ปุ่มสร้าง */}
            <div className="flex flex-col items-end">
                <button 
                    className="px-6 py-2 bg-teal-400 text-white rounded-lg font-bold hover:bg-teal-500 transition cursor-pointer" // เพิ่ม cursor-pointer
                    onClick={handleCreateTrip} 
                >
                    สร้าง
                </button>

                {/* ช่องจำนวนคน (เหมือนป้ายข้อความ) */}
                <input 
                    type="number" 
                    min="1"
                    value={maxPeople} 
                    onChange={(e) => setMaxPeople(e.target.value)}
                    placeholder="จำนวนคนมากที่สุด"
                    className="mt-2 p-2 border border-gray-300 rounded-lg text-center w-full max-w-[200px] bg-gray-200 text-gray-700"
                />
            </div>
        </div>
    );
};

export default UserInfo;
