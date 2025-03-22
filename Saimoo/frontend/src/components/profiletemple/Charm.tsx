import React, { useState } from "react";

const Charm = ({ charms }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="bg-white p-4 mb-4">
      {/* 🔹 Grid แสดงพระเครื่อง */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {charms.map((charm, idx) => (
          <div key={idx} className="relative bg-white  transition-all 
                     text-center ">
            {/* 🔥 กดที่รูปภาพเพื่อเปิดดูแบบเต็มจอ */}
            <img
              src={charm.image}
              alt={charm.title}
              className="w-full h-48 object-contain rounded-lg  transition-transform  "
              onClick={() => setSelectedImage(charm.image)}
            />

            {/* 🏷️ ข้อมูลพระเครื่อง */}
            <h3 className="text-lg font-semibold mt-2">{charm.title}</h3>
            <p className="text-sm text-gray-600">เนื้อพระ: {charm.material}</p>
            <p className="text-sm text-gray-600">รุ่น: {charm.generation}</p>
            <p className="text-lg font-bold text-gray-900 mt-1">฿{charm.price}</p>
            
          </div>
        ))}
      </div>

      
      
    </div>
  );
};

export default Charm;
