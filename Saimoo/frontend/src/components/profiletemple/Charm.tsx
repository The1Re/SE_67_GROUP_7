import { env } from "@/config";
import React, { useState } from "react";

const Charm = ({ charms }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="bg-white p-4 mb-4">
      {/* 🔹 Grid แสดงพระเครื่อง */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-b border-gray-200 pb-4">
        {charms.map((charm, idx) => (
          <div key={idx} className="relative bg-white overflow-hidden transition-all duration-300 
                     hover:shadow-lg hover:-translate-y-2 active:shadow-xl active:scale-105 cursor-pointer text-center ">
            {/* 🔥 กดที่รูปภาพเพื่อเปิดดูแบบเต็มจอ */}
            <img
              src={env.API_URL + "/" + charm.image}
              alt={charm.title}
              className="w-full h-48 object-contain rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105 "
              onClick={() => setSelectedImage(charm.image)}
            />

            {/* 🏷️ ข้อมูลพระเครื่อง */}
            <h3 className="text-lg font-semibold mt-2">{charm.title}</h3>
            <p className="text-sm text-gray-600">เนื้อพระ: {charm.material}</p>
            <p className="text-sm text-gray-600">รุ่น: {charm.generation}</p>
            <p className="text-lg font-bold text-gray-900 mt-1">฿{charm.price}</p>
            <p className="text-sm text-gray-500">เหลือ {charm.quantity} ชิ้น</p>
          </div>
        ))}
      </div>

      
      
    </div>
  );
};

export default Charm;
