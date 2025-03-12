import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddActivity = ({ show, onClose, onSave, editingActivity }) => {
  const [activityData, setActivityData] = useState(
    editingActivity || { name: "", startDate: new Date(), endDate: new Date(), image: null }
  );

  const handleChange = (e) => {
    setActivityData({ ...activityData, [e.target.name]: e.target.value });
  };

  const handleStartDateChange = (date) => {
    setActivityData((prev) => ({
      ...prev,
      startDate: date,
      endDate: date > prev.endDate ? date : prev.endDate, // ป้องกันเลือกสิ้นสุดก่อนเริ่ม
    }));
  };

  const handleEndDateChange = (date) => {
    if (date >= activityData.startDate) {
      setActivityData({ ...activityData, endDate: date });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setActivityData({ ...activityData, image: URL.createObjectURL(file) });
    }
  };

  // ✅ ฟังก์ชันลบรูป
  const handleDeleteImage = () => {
    setActivityData({ ...activityData, image: null });
  };

  const handleSave = () => {
    onSave(activityData);
  };

  if (!show) return null;

  return (
    // ✅ คลิกนอก Popup แล้วปิด
    <div 
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50"
      onClick={onClose} 
    >
      {/* ✅ ป้องกันการปิด Popup เมื่อคลิกข้างใน */}
      <div 
        className="bg-white p-6 rounded-2xl shadow-lg w-96 relative"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* หัวข้อ Popup */}
        <h2 className="text-2xl font-bold text-[#44AFB6] text-center mb-4">
          {editingActivity ? "Edit Activity" : "Add Activity"}
        </h2>

        {/* ✅ อัปโหลดรูป และแสดงผลตามสัดส่วนภาพ */}
        <label className="w-full flex items-center justify-center bg-gray-200 rounded-lg cursor-pointer overflow-hidden border-dashed border-2 border-gray-400">
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          {activityData.image ? (
            <div className="relative w-full aspect-w-16 aspect-h-9">
              <img src={activityData.image} alt="Activity Upload" className="w-full h-full object-contain rounded-lg" />
              {/* ✅ ปุ่มลบรูป */}
              <button
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-700"
                onClick={handleDeleteImage}
              >
                Delete
              </button>
            </div>
          ) : (
            <span className="text-3xl text-gray-500">+</span>
          )}
        </label>

        {/* ชื่อกิจกรรม */}
        <label className="block text-left text-gray-700 mt-4 mb-1 font-semibold">
          ชื่อกิจกรรม
        </label>
        <input
          type="text"
          name="name"
          value={activityData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="กรอกชื่อกิจกรรม"
        />

        {/* เลือกวันที่เริ่มต้น */}
        <label className="block text-left text-gray-700 mt-4 mb-1 font-semibold">
          วันที่เริ่มกิจกรรม
        </label>
        <DatePicker
          selected={activityData.startDate}
          onChange={handleStartDateChange}
          dateFormat="dd/MM/yyyy"
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        {/* เลือกวันที่สิ้นสุด */}
        <label className="block text-left text-gray-700 mt-4 mb-1 font-semibold">
          วันที่สิ้นสุดกิจกรรม
        </label>
        <DatePicker
          selected={activityData.endDate}
          onChange={handleEndDateChange}
          dateFormat="dd/MM/yyyy"
          minDate={activityData.startDate}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        {/* ปุ่มบันทึก */}
        <button
          className="bg-[#44AFB6] text-white w-full px-4 py-2 mt-6 rounded-lg shadow-md hover:bg-teal-600"
          onClick={handleSave}
        >
          {editingActivity ? "Save Changes" : "Add Activity"}
        </button>
      </div>
    </div>
  );
};

export default AddActivity;
