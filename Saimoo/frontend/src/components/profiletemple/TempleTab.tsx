import React, { useState } from "react";
import Activity from "./Activity";
import Charm from "./Charm";
import Picture from "./Picture";

const TempleTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Activity");

  // 🔹 เพิ่มข้อมูลกิจกรรม (Fake Data)
  const activityData = [
    {
      title: "เทศกาลไหว้พระ",
      date: "12 เมษายน 2024",
      description: "งานบุญประจำปีที่วัดศีรษะทอง จัดขึ้นเพื่อสักการะพระราหู",
      image: "/assets/imagetemple/7.jpg",
    },
    {
      title: "พิธีบวงสรวง",
      date: "20 พฤษภาคม 2024",
      description: "พิธีกรรมที่สืบทอดมาแต่โบราณ ณ วัดศีรษะทอง",
      image: "/assets/imagetemple/8.jpg",
    },
  ];
  const charmData = [
    {
      title: "พระปิดตา",
      material: "พระเนื้อชิน",
      generation: "ปลอดภัยไร้เงิน",
      image: "/assets/imagetemple/9.jpg",
      price: 20000,
      quantity: 10,
    },
    {
      title: "หลวงพ่อโต",
      material: "ทองคำแท้",
      generation: "รุ่นมหาเศรษฐี",
      image: "/assets/imagetemple/10.jpg",
      price: 35000,
      quantity: 5,
    },
  ];
  const imageData = [
    "/assets/imagetemple/1.jpg",
    "/assets/imagetemple/2.jpg",
    "/assets/imagetemple/3.jpg",
    "/assets/imagetemple/4.jpg",
    "/assets/imagetemple/5.jpg",
  ];
  return (
    <div className="mt-6">
      {/* 🔹 เมนูแท็บ */}
      <div className="flex justify-center border-b">
        {["Activity", "Charm", "Picture"].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 text-lg font-semibold transition-colors ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 🔹 แสดงเฉพาะข้อมูลของแท็บที่เลือก */}
      <div className="p-4">
        {activeTab === "Activity" && <Activity activities={activityData} />}
        {activeTab === "Charm" && <Charm charms={charmData} />}
        {activeTab === "Picture" && <Picture images={imageData} />}
      </div>
    </div>
  );
};

export default TempleTab;
