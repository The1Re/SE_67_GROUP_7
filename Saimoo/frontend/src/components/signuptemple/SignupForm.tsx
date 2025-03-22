import React, { useState } from "react";
import FileUpload from "./FileUpload";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import toast from "react-hot-toast";

export type SignupTempleFormData = {
  fullName: string;
  email: string;
  templeName: string;
  temple_doc_path?: string;
  id_card_path?: string;
};

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupTempleFormData>({
    fullName: "",
    email: "",
    templeName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSumbit = async () => {
    if (!formData.id_card_path || !formData.temple_doc_path) {
      alert("กรุณาอัพโหลดเอกสารยืนยันตัวตน");
      return;
    }

    const res = await api.post("/requests/temple", formData)
    if (res.status === 201) {
      toast.success("ส่งคำขอเรียบร้อยแล้ว");
      navigate("/");
    } else {
      toast.error("เกิดข้อผิดพลาดในการส่งคำขอ");
    }
  }

  return (
    <div className="space-y-6 w-full"> 
      {["fullName", "email", "templeName"].map((field, index) => (
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
        <FileUpload callback={(fileUrl: string) => setFormData({ ...formData, temple_doc_path: fileUrl})} label="เอกสารเกี่ยวกับวัด" />
        <FileUpload callback={(fileUrl: string) => setFormData({ ...formData, id_card_path: fileUrl})} label="ภาพถ่ายบัตรประชาชนผู้อ้างอิง" />
      </div>

      <div className="flex space-x-4 mt-6">
        <button 
          className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg text-lg w-32 cursor-pointer"
          onClick={handleSumbit}
        >
          ส่ง
        </button>
        <button
          type="reset"
          className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg text-lg w-32 cursor-pointer"
          onClick={() => navigate("/")}
        >
          ยกเลิก
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
