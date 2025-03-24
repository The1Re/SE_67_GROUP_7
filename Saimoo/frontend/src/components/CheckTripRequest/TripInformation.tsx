import React from "react";

const TripInformation = ({ formData, handleChange }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">ข้อมูลทริป</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">ชื่อทริป:</label>
        <input
          type="text"
          name="tripName"
          value={formData.tripName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      {/* เพิ่มข้อมูลฟอร์มที่เหลือ */}
    </div>
  );
};

export default TripInformation;
