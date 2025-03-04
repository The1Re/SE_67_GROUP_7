import React from "react";
import { FaRegEdit } from "react-icons/fa"; // ✅ ไอคอนดินสอ

const TempleInfo = ({ templeData, setTempleData, descImage, setDescImage }) => {
  const handleChange = (e) => {
    setTempleData({ ...templeData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full p-8 flex flex-col items-center"> {/* ✅ จัดให้อยู่ตรงกลาง */}
      <div className="max-w-5xl w-full p-6">
        
        {/* ✅ โลโก้ดินสอ + ชื่อวัด (ติดกันและอยู่ตรงกลาง) */}
        
        <div className="flex justify-center mb-6">
        <div className="inline-flex items-center"> {/* ❌ ลบ gap-2 ออก */}
         {/* ✅ ลดช่องว่างแบบกำหนดเอง */}
        <input
          type="text"
          name="name"
          value={templeData.name}
          onChange={handleChange}
          className="text-4xl font-bold text-black border-none focus:outline-none w-auto text-center leading-none"
        />
        </div>
        
        </div>


        {/* ✅ รูปภาพและข้อมูลวัด */}
        <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-6 items-start">
          
          {/* ✅ รูปภาพหลัก */}
          <div className="flex flex-col items-center w-full">
            <label className="w-full max-w-[350px] min-h-[220px] bg-gray-300 flex items-center justify-center rounded-lg border border-gray-400 overflow-hidden cursor-pointer aspect-[4/3]">
              <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setDescImage(URL.createObjectURL(file));
                }
              }} />
              {descImage ? (
                <img src={descImage} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
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
              className="w-full min-h-[180px] max-h-[350px] p-4 border rounded-lg text-lg mt-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
            ></textarea>

            <h2 className="text-xl font-semibold mt-4">ที่อยู่</h2>
            <input
              type="text"
              name="address"
              value={templeData.address}
              onChange={handleChange}
              className="w-full p-4 border rounded-lg text-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default TempleInfo;