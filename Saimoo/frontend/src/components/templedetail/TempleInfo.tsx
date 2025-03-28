import { useState } from "react";
import { Save } from "lucide-react"; // ยังคง import Pencil ไว้

const TempleInfo = ({ templeData, setTempleData, descImage, setDescImage, saveTempleData }) => {
  // ลบ state isEditingName ออก เนื่องจากไม่ต้องการให้แก้ไขชื่อวัด

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempleData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full p-6 flex flex-col items-center mt-4">
      <div className="max-w-5xl w-full p-6 bg-white rounded-lg shadow-md">
        
        {/* ชื่อวัด - แสดงเป็นข้อความธรรมดา ไม่มีไอคอนดินสอและไม่สามารถแก้ไขได้ */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <h1 className="text-4xl font-bold text-black">{templeData.name || "ชื่อวัด"}</h1>
        </div>

        {/* รูปภาพและข้อมูลวัด */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-start">
          
          {/* รูปภาพหลัก */}
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
            </label>
          </div>

          <div className="text-black w-full">
            <h2 className="text-xl font-semibold mt-2">คำอธิบาย</h2>
            <textarea
              name="description"
              value={templeData.description}
              onChange={handleChange}
              className="w-full min-h-[150px] max-h-[300px] p-3 border rounded-md shadow-sm text-lg mt-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
            ></textarea>

            <h2 className="text-xl font-semibold mt-4">จังหวัด</h2>
            
            <div className="w-full p-3 border rounded-md shadow-sm text-lg mt-2 bg-gray-100">
              {templeData.province || "ไม่ระบุ"}
            </div>
            
            {/* เพิ่มปุ่มบันทึก */}
            <div className="flex justify-end mt-6">
              <button
                onClick={saveTempleData}
                className="flex items-center gap-2 px-6 py-3 bg-[#44AFB6] text-white rounded-lg hover:bg-teal-600 transition-colors shadow-md"
              >
                <Save className="w-5 h-5" />
                <span>บันทึกข้อมูล</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempleInfo;
