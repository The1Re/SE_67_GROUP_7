import React from "react";

const TempleCard = ({ trip }) => {
  return (
    <div className="bg-white p-4 cursor-pointer overflow-hidden"> {/* ❌ ไม่มีเอฟเฟกต์ขยับหรือโฮเวอร์ */}
      <img
        src={trip.imageUrl}
        alt={trip.title}
        className="w-full h-40 object-cover" // ❌ ไม่มีขอบโค้งมน
      />
      <h3 className="text-gray-800 font-bold mt-2">{trip.title}</h3>
      <p className="text-gray-600 text-sm">{trip.description}</p>
    </div>
  );
};

export default TempleCard;
