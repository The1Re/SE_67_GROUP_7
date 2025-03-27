import React, { useState } from "react";
import FileUpload from "./FileUpload";
import toast from "react-hot-toast";
import api from "@/api";
import { useNavigate } from "react-router-dom";

export type SignupFormData = {
  fullName: string;
  phone: string;
  guide_doc_path?: string;
  id_card_path?: string;
};

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // กรองเฉพาะตัวเลข และจำกัดความยาวไม่เกิน 10 ตัว
      const phoneValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: phoneValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSumbit = async () => {
    if (!formData.fullName || !formData.phone) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    // ตรวจสอบความยาวเบอร์โทร
    if (formData.phone.length !== 10) {
      toast.error("กรุณากรอกเบอร์โทรให้ครบ 10 หลัก");
      return;
    }

    if (!formData.id_card_path || !formData.guide_doc_path) {
      toast.error("กรุณาอัพโหลดเอกสารยืนยันตัวตน");
      console.log(formData);
      return;
    }

    try {
      setIsSubmitting(true);

      const token = localStorage.getItem("token");
      console.log("🔑 Token:", token);

      if (!token) {
        toast.error("กรุณาเข้าสู่ระบบก่อนทำรายการ");
        return;
      }

      const res = await api.post("/requests/guide", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        alert("ส่งคำขอเรียบร้อย");
        // reset form
        setFormData({
          fullName: "",
          phone: "",
        });
      } else {
        toast.error("เกิดข้อผิดพลาดในการส่งคำขอ กรุณาลองใหม่อีกครั้ง");
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("ไม่ได้รับอนุญาต (Token ผิดหรือหมดอายุ)");
      } else {
        toast.error("เกิดข้อผิดพลาดในการส่งคำขอ");
      }
      console.error("❌ Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="text-left" onSubmit={(e) => e.preventDefault()}>
      {/* Full Name Input */}
      <div className="flex flex-col">
        <label className="text-gray-700 text-lg font-medium mb-2">
          ชื่อ - นามสกุล
        </label>
        <input
          type="text"
          name="fullName"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.fullName}
          onChange={handleChange}
        />
      </div>

      {/* Phone Input */}
      <div className="flex flex-col mt-4">
        <label className="text-gray-700 text-lg font-medium mb-2">
          เบอร์โทร
        </label>
        <input
          type="tel"
          name="phone"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.phone}
          onChange={handleChange}
          placeholder="กรอกเบอร์โทร 10 หลัก"
        />
      </div>

      {/* File Uploads */}
      <div className="mt-4">
        <p className="text-lg font-medium text-gray-800">เอกสารยืนยันตัวตน</p>
        <div className="space-y-3 mt-2">
          {/* ✅ อัปโหลดเอกสารแสดงความเป็นไกด์ */}
          <FileUpload
            callback={(fileUrl: string) =>
              setFormData({ ...formData, guide_doc_path: fileUrl })
            }
            label="เอกสารแสดงความเป็นไกด์"
          />
          {/* ✅ อัปโหลดบัตรประชาชนของไกด์ */}
          <FileUpload
            callback={(fileUrl: string) =>
              setFormData({ ...formData, id_card_path: fileUrl })
            }
            label="บัตรประชาชน"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-start space-x-4 mt-6">
        <button
          type="button"
          className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg text-lg w-40 font-semibold shadow-md cursor-pointer"
          onClick={handleSumbit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "กำลังส่ง..." : "ส่ง"}
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
    </form>
  );
};

export default SignupForm;