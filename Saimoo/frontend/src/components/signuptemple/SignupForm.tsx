import React, { useState } from "react";
import FileUpload from "./FileUpload";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import toast from "react-hot-toast";
import SubmitPopup from "./SubmitPopup";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSumbit = async () => {
    // ตรวจสอบว่าผู้ใช้กรอกข้อมูลครบหรือไม่
    if (!formData.fullName || !formData.email || !formData.templeName) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    // ตรวจสอบว่าผู้ใช้อัพโหลดเอกสารครบหรือไม่
    if (!formData.id_card_path || !formData.temple_doc_path) {
      toast.error("กรุณาอัพโหลดเอกสารยืนยันตัวตน");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await api.post("/requests/temple", formData);
      
      if (res.status === 201) {
        // แสดง popup แทนการใช้ toast และ navigate
        setShowPopup(true);
      } else {
        toast.error("เกิดข้อผิดพลาดในการส่งคำขอ");
      }
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการส่งคำขอ");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate("/"); // นำทางกลับไปหน้าหลักหลังจากปิด popup
  };

  return (
    <div className="space-y-6 w-full"> 
      <div className="grid grid-cols-3 gap-4 items-center">
        <label className="text-gray-700 text-lg font-medium">
          ชื่อ - นามสกุล
        </label>

        <input
          type="text"
          name="fullName"
          className="col-span-2 w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.fullName}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 items-center">
        <label className="text-gray-700 text-lg font-medium">
          อีเมล
        </label>

        <input
          type="email"
          name="email"
          className="col-span-2 w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 items-center">
        <label className="text-gray-700 text-lg font-medium">
          ชื่อวัด
        </label>

        <input
          type="text"
          name="templeName"
          className="col-span-2 w-full px-3 py-2 border border-gray-400 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.templeName}
          onChange={handleChange}
        />
      </div>

      <p className="text-lg font-medium text-gray-800 mt-4">เอกสารยืนยันตัวตน</p>

      <div className="space-y-3">
        <FileUpload 
          callback={(fileUrl: string) => setFormData({ ...formData, temple_doc_path: fileUrl})} 
          label="เอกสารเกี่ยวกับวัด" 
        />
        <FileUpload 
          callback={(fileUrl: string) => setFormData({ ...formData, id_card_path: fileUrl})} 
          label="ภาพถ่ายบัตรประชาชนผู้อ้างอิง" 
        />
      </div>

      <div className="flex space-x-4 mt-6">
        <button 
          className={`bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg text-lg w-32 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={handleSumbit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'กำลังส่ง...' : 'ส่ง'}
        </button>
        <button
          type="reset"
          className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg text-lg w-32 cursor-pointer"
          onClick={() => navigate("/")}
          disabled={isSubmitting}
        >
          ยกเลิก
        </button>
      </div>

      {/* Popup component สำหรับแสดงสถานะการส่งเอกสาร */}
      <SubmitPopup isOpen={showPopup} onClose={handlePopupClose} />
    </div>
  );
};

export default SignupForm;