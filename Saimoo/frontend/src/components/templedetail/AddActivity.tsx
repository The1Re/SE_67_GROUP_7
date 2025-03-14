import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddActivity = ({ show, onClose, onSave, editingActivity }) => {
  const [activityData, setActivityData] = useState(
    editingActivity || { 
      name: "", 
      description: "",  
      startDate: new Date(), 
      endDate: new Date(), 
      image: null 
    }
  );

  const handleChange = (e) => {
    setActivityData({ ...activityData, [e.target.name]: e.target.value });
  };

  const handleStartDateChange = (date) => {
    setActivityData((prev) => ({
      ...prev,
      startDate: date,
      endDate: date > prev.endDate ? date : prev.endDate,
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
    <div 
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50"
      onClick={onClose} 
    >
      <div 
        className="bg-white p-6 rounded-2xl shadow-lg w-[700px] flex gap-6"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* ✅ ส่วนของรูปภาพ (ซ้าย) */}
        <div className="w-1/3 flex flex-col items-center">
          <label className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg cursor-pointer overflow-hidden border-dashed border-2 border-gray-400">
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            {activityData.image ? (
              <div className="relative w-full h-full">
                <img src={activityData.image} alt="Activity Upload" className="w-full h-full object-cover rounded-lg" />
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
        </div>

        {/* ✅ ส่วนของฟอร์ม (ขวา) */}
        <div className="w-2/3">
          <h2 className="text-2xl font-bold text-[#44AFB6] text-center mb-4">
            {editingActivity ? "Edit Activity" : "Add Activity"}
          </h2>

          {/* ชื่อกิจกรรม */}
          <label className="block text-left text-gray-700 mt-2 mb-1 font-semibold">
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

          {/* คำอธิบายกิจกรรม */}
          <label className="block text-left text-gray-700 mt-2 mb-1 font-semibold">
            คำอธิบายกิจกรรม
          </label>
          <textarea
            name="description"
            value={activityData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
            placeholder="กรอกรายละเอียดกิจกรรม"
            rows="3"
          ></textarea>

          {/* วันที่เริ่มต้นกิจกรรม */}
          <label className="block text-left text-gray-700 mt-2 mb-1 font-semibold">
            วันที่เริ่มกิจกรรม
          </label>
          <DatePicker
            selected={activityData.startDate}
            onChange={handleStartDateChange}
            dateFormat="dd/MM/yyyy"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          {/* วันที่สิ้นสุดกิจกรรม */}
          <label className="block text-left text-gray-700 mt-2 mb-1 font-semibold">
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
            className="bg-[#44AFB6] text-white w-full px-4 py-2 mt-4 rounded-lg shadow-md hover:bg-teal-600"
            onClick={handleSave}
          >
            {editingActivity ? "Save Changes" : "Add Activity"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddActivity;
