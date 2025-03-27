import React from "react";
import { OrderDetailRequest } from "@/models/Order";
interface ParticipantFormProps {
  index: number;
  data: OrderDetailRequest;
  onChange: (
    index: number,
    field: keyof OrderDetailRequest,
    value: string | boolean
  ) => void;
}

const ParticipantForm: React.FC<ParticipantFormProps> = ({
  index,
  data,
  onChange
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6 w-3/4 mx-auto">
      <h3 className="text-lg font-semibold mb-4">ผู้เข้าร่วมคนที่ {index + 1}</h3>
      
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          ชื่อ-นามสกุล <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.fullName || ""}
          onChange={(e) => onChange(index, "fullName", e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="ชื่อ-นามสกุล"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          เบอร์โทรศัพท์
        </label>
        <input
          type="tel"
          value={data.phone || ""}
          onChange={(e) => onChange(index, "phone", e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="เบอร์โทรศัพท์ (10 หลัก)"
          maxLength={10}
        />
      </div>
      
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          ความต้องการพิเศษ
        </label>
        <textarea
          value={data.requirement || ""}
          onChange={(e) => onChange(index, "requirement", e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="ความต้องการพิเศษ (ถ้ามี)"
          rows={3}
        />
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id={`isChild-${index}`}
          checked={Boolean(data.isChild)}
          onChange={(e) => onChange(index, "isChild", e.target.checked)}
          className="mr-2"
        />
        <label htmlFor={`isChild-${index}`}>เป็นเด็ก (อายุต่ำกว่า 6 ปี)</label>
      </div>
    </div>
  );
};

export default ParticipantForm;
