import React from 'react';

const OfficialSection = ({ formData, handleChange }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">สำหรับเจ้าหน้าที่</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">ผลการตรวจสอบ:</label>
        {/* ใส่ radio button หรือ input ตามที่ต้องการ */}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">หมายเหตุ:</label>
        <textarea
          name="approvalNotes"
          value={formData.approvalNotes}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="3"
        ></textarea>
      </div>
      {/* เพิ่มฟิลด์อื่น ๆ เช่น ผู้ตรวจสอบ, วันที่ */}
    </div>
  );
};

export default OfficialSection;
