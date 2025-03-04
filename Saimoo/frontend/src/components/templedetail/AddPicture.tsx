import React, { useState } from "react";

const AddPicture = ({ show, onClose, onEdit }) => {
  const [imageUrl, setImageUrl] = useState(null);

  if (!show) return null; // ❌ ไม่แสดง Pop-up ถ้า show = false

  // ✅ อัปโหลดรูป
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url); // ✅ แสดงตัวอย่าง
      console.log("Uploaded Image URL:", url); // ✅ ตรวจสอบ URL รูป
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-2xl w-full text-center">
        <h2 className="text-xl font-bold text-[#44AFB6]">Add / Edit Picture</h2>

        {/* ✅ ปรับขนาดให้ใหญ่ขึ้น */}
        <label className="w-full min-h-[300px] bg-gray-300 flex items-center justify-center rounded-lg cursor-pointer mt-4 overflow-hidden">
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          {imageUrl ? (
            <img src={imageUrl} alt="Uploaded" className="w-full h-auto max-h-[500px] object-cover rounded-lg" />
          ) : (
            <span className="text-4xl text-gray-600">+</span>
          )}
        </label>

        {/* ✅ ปุ่ม Add/Edit */}
        <div className="flex justify-center space-x-4 mt-6">
          <button 
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-700 text-lg"
            onClick={() => imageUrl && onEdit(imageUrl)} // ✅ ส่งรูปไป TempleDetailPage
          >
            {imageUrl ? "Save" : "Add"}
          </button>
          <button 
            className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-700 text-lg"
            onClick={onClose} // ❌ ปิด Pop-up
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPicture;