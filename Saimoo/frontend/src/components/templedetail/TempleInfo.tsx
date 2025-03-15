import React, { useState } from "react";
import { Pencil } from "lucide-react"; // ✅ ใช้ Lucide Icons สำหรับดินสอ

const TempleInfo = ({ templeData, setTempleData, descImage, setDescImage }) => {
  const [isEditingName, setIsEditingName] = useState(false); // ✅ State สำหรับแก้ไขชื่อ

  const handleChange = (e) => {
    setTempleData({ ...templeData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full p-6 flex flex-col items-center mt-4">
      <div className="max-w-5xl w-full p-6 bg-white rounded-lg shadow-md">
        
        {/* ✅ ชื่อวัด + ไอคอนดินสอ */}
        <div className="flex justify-center items-center gap-2 mb-6">
          {isEditingName ? (
            <input
              type="text"
              name="name"
              value={templeData.name}
              onChange={handleChange}
              onBlur={() => setIsEditingName(false)}
              className="text-6xl font-extrabold tracking-wide text-center border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
              autoFocus
            />
          ) : (
            <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => setIsEditingName(true)}>
              <h1 className="text-4xl font-bold text-black">{templeData.name || "ชื่อวัด"}</h1>
              <Pencil className="w-6 h-6 text-gray-500 group-hover:text-black transition duration-200" /> 
            </div>
          )}
        </div>

        {/* ✅ รูปภาพและข้อมูลวัด */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-start">
          
          {/* ✅ รูปภาพหลัก (รักษาสัดส่วนภาพ) */}
          <div className="flex flex-col items-center w-full">
            <label className="w-full max-w-[400px] bg-gray-300 flex items-center justify-center rounded-lg border border-gray-400 overflow-hidden cursor-pointer">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setDescImage(URL.createObjectURL(file));
                  }
                }} 
              />
              {descImage ? (
                <img 
                  src={descImage} 
                  alt="Uploaded" 
                  className="w-auto h-auto max-h-[400px] max-w-full object-contain rounded-lg"
                />
              ) : (
                <span className="text-gray-600 text-3xl">+</span>
              )}
            </label>
          </div>

          {/* ✅ ข้อมูลวัด */}
          <div className="text-black w-full">
            <h2 className="text-xl font-semibold mt-2">คำอธิบาย</h2>
            <textarea
              name="description"
              value={templeData.description}
              onChange={handleChange}
              className="w-full min-h-[150px] max-h-[300px] p-3 border rounded-md shadow-sm text-lg mt-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
            ></textarea>

            <h2 className="text-xl font-semibold mt-4">ที่อยู่</h2>
            <input
              type="text"
              name="address"
              value={templeData.address}
              onChange={handleChange}
              className="w-full p-3 border rounded-md shadow-sm text-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default TempleInfo;
