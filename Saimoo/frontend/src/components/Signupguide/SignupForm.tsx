import React, { useState } from "react";
import FileUpload from "./FileUpload";

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
        <form className=" text-left">
          {[{ field: "name", label: "ชื่อ - นามสกุล" }, { field: "phone", label: "เบอร์โทร" }].map((item, index) => (
            <div key={index} className="flex flex-col">
              {/* ✅ Label ชิดซ้ายของกรอบ */}
              <label className="text-gray-700 text-lg font-medium mb-2">
                {item.label}
              </label>

              {/* ✅ Input ชิดซ้ายของกรอบ */}
              <input
                type={item.field === "phone" ? "tel" : "text"}
                name={item.field}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData[item.field as keyof typeof formData]}
                onChange={handleChange}
              />
            </div>
          ))}

          {/* ✅ ส่วนอัปโหลดเอกสารชิดซ้ายของกรอบ */}
          <div className="mt-4">
            <p className="text-lg font-medium text-gray-800">เอกสารยืนยันตัวตน</p>
            <div className="mt-2">
              <FileUpload label="เอกสารรับรองว่าเป็นไกด์" />
            </div>
            <div className="mt-2">
              <FileUpload label="ภาพถ่ายบัตรประชาชน" />
            </div>
          </div>

          {/* ✅ ปุ่มชิดซ้ายของกรอบ */}
          <div className="flex justify-start space-x-4 mt-6">
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg text-lg w-40 font-semibold shadow-md cursor-pointer"
            >
              ส่ง
            </button>
            <button
              type="reset"
              className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg text-lg w-40 font-semibold shadow-md cursor-pointer"
              onClick={() => setFormData({ name: "", phone: "" })}
            >
              ยกเลิก
            </button>
          </div>
        </form>
      
  
  );
};

export default SignupForm;