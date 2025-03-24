import React from "react";
import { useNavigate } from "react-router-dom";

const TempleCard = ({ trip }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white p-4 cursor-pointer "
      onClick={() => navigate(`/temples/profiletemple`)} // 📌 คลิกแล้วไปหน้า profiletemple
    >
      <img
        src={trip.imageUrl}
        alt={trip.title}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <h3 className="text-gray-800 font-bold mt-2">{trip.title}</h3>
      <p className="text-gray-600 text-sm">{trip.description}</p>
    </div>
  );
};

export default TempleCard;
