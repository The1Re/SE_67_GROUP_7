import React from "react";
import { FaTimes } from "react-icons/fa";

const AddCharmPopup = ({ showAddCharmPopup, setShowAddCharmPopup, charmData, setCharmData, charmImage, setCharmImage }) => {
  const handleCharmChange = (e) => {
    setCharmData({ ...charmData, [e.target.name]: e.target.value });
  };

  if (!showAddCharmPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-full text-center">
        <button className="absolute top-2 right-2 text-gray-700" onClick={() => setShowAddCharmPopup(false)}>
          <FaTimes />
        </button>
        <h2 className="text-xl font-bold text-[#44AFB6]">Add Charm Temple</h2>

        {/* อัปโหลดรูป Charm */}
        <label className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-lg cursor-pointer mt-4">
          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
            const file = e.target.files[0];
            if (file) setCharmImage(URL.createObjectURL(file));
          }} />
          {charmImage ? <img src={charmImage} alt="Charm Upload" className="w-full h-full object-cover rounded-lg" /> : <span className="text-3xl text-gray-600">+</span>}
        </label>

        {/* ฟิลด์ข้อมูล Charm */}
        {["name", "material", "model", "price"].map((field) => (
          <div key={field} className="mt-2">
            <label className="block font-bold">{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input type="text" name={field} value={charmData[field]} onChange={handleCharmChange} className="w-full p-2 border rounded-lg text-sm" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCharmPopup;
