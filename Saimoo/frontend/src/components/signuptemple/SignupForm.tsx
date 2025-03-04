import React, { useState } from "react";
import FileUpload from "./FileUpload";

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    temple: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="space-y-6 w-full"> 
      {["name", "email", "temple"].map((field, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 items-center">
          <label className="text-gray-700 text-lg font-medium">
            {field === "name" ? "ชื่อ - นามสกุล" : field === "email" ? "อีเมล" : "ชื่อวัด"}
          </label>

          <input
            type={field === "email" ? "email" : "text"}
            name={field}
            className="col-span-2 w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData[field]}
            onChange={handleChange}
          />
        </div>
      ))}

      <p className="text-lg font-medium text-gray-800 mt-4">เอกสารยืนยันตัวตน</p>

      <div className="space-y-3">
        <FileUpload label="เอกสารเกี่ยวกับวัด" />
        <FileUpload label="ภาพถ่ายบัตรประชาชนผู้อ้างอิง" />
      </div>

      <div className="flex space-x-4 mt-6">
        <button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg text-lg w-32 cursor-pointer">
          ส่ง
        </button>
        <button
          type="reset"
          className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg text-lg w-32 cursor-pointer"
          onClick={() => setFormData({ name: "", email: "", temple: "" })}
        >
          ยกเลิก
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
