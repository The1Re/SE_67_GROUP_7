import React, { useRef, useState } from "react";

const SignupTemple: React.FC = () => {
  const templeDocRef = useRef<HTMLInputElement>(null);
  const idCardRef = useRef<HTMLInputElement>(null);

  // ✅ ใช้ useState เก็บค่าจาก input
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    temple: "",
  });

  // ✅ ฟังก์ชันอัปเดตค่าใน state เมื่อผู้ใช้พิมพ์
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
  <div className="w-[500px]">
    <h3 className="text-lg font-semibold mb-4 text-black border-b-2 border-gray-400 pb-2 inline-block w-fit">
      ยื่นเรื่องขอเป็นตัวแทนวัด
    </h3>

        <form>
          {/* ✅ ชื่อ - นามสกุล */}
          <label className="block text-sm font-medium mb-1 text-gray-800">
            ชื่อ - นามสกุล
          </label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded mb-3 border-gray-400"
            value={formData.name}
            onChange={handleChange}
          />

          {/* ✅ อีเมล */}
          <label className="block text-sm font-medium mb-1 text-gray-800">
            อีเมล
          </label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border rounded mb-3 border-gray-400"
            value={formData.email}
            onChange={handleChange}
          />

          {/* ✅ ชื่อวัด */}
          <label className="block text-sm font-medium mb-1 text-gray-800">
            ชื่อวัด
          </label>
          <input
            type="text"
            name="temple"
            className="w-full p-2 border rounded mb-3 border-gray-400"
            value={formData.temple}
            onChange={handleChange}
          />

          {/* ✅ เอกสารยืนยันตัวตน */}
          <p className="text-sm font-medium mb-2 text-gray-800">
            เอกสารยืนยันตัวตน
          </p>

          {/* ✅ ปุ่มเลือกไฟล์ - เอกสารเกี่ยวกับวัด */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-gray-800">
              เอกสารเกี่ยวกับวัด
            </label>
            <input type="file" ref={templeDocRef} className="hidden" />
            <button
              type="button"
              className="w-full bg-[#D9D9D9] hover:bg-gray-400 text-black px-4 py-2 rounded shadow-md"
              onClick={() => templeDocRef.current?.click()}
            >
              เลือกไฟล์
            </button>
          </div>

          {/* ✅ ปุ่มเลือกไฟล์ - ภาพบัตรประชาชน */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-800">
              ภาพถ่ายบัตรประชาชนผู้อ้างอิง
            </label>
            <input type="file" ref={idCardRef} className="hidden" />
            <button
              type="button"
              className="w-full bg-[#D9D9D9] hover:bg-gray-400 text-black px-4 py-2 rounded shadow-md"
              onClick={() => idCardRef.current?.click()}
            >
              เลือกไฟล์
            </button>
          </div>

          {/* ✅ ปุ่ม "ส่ง" และ "ยกเลิก" */}
          <div className="flex justify-start space-x-4">
            <button
              type="submit"
              className="bg-[#44AFB6] hover:bg-teal-600 text-white px-6 py-2 rounded shadow-md"
            >
              ส่ง
            </button>
            <button
              type="reset"
              className="bg-[#8D8E8E] hover:bg-gray-600 text-white px-6 py-2 rounded shadow-md"
              onClick={() => setFormData({ name: "", email: "", temple: "" })}
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupTemple;
