import React from "react";

const CharmList = ({ charms }) => {
  if (!charms || charms.length === 0) {
    return <p className="text-gray-500 text-center mt-4">ยังไม่มีเครื่องรางในขณะนี้</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {charms.map((charm, index) => (
        <div key={index} className="p-4 border rounded-lg shadow-md bg-white">
          <h3 className="font-bold text-lg">{charm.name}</h3>
          <p className="text-sm text-gray-600">วัสดุ: {charm.material}</p>
          <p className="text-sm text-gray-600">รุ่น: {charm.model}</p>
          <p className="text-sm text-gray-600">ราคา: {charm.price} บาท</p>
          {charm.image && <img src={charm.image} alt={charm.name} className="mt-2 w-full h-32 object-cover rounded-lg" />}
        </div>
      ))}
    </div>
  );
};

export default CharmList;
