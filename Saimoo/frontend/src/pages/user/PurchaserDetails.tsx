// pages/PurchaserDetails.tsx
import ParticipantForm from "@/components/purchaser/ParticipantForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Participant {
  name: string;
  phone: string;
  note: string;
  ageUnder6: boolean;
}

function PurchaserDetails() {
  const [numPeople, setNumPeople] = useState(1);
  const [participants, setParticipants] = useState<Participant[]>(
    Array(1).fill({ name: "", phone: "", note: "", ageUnder6: false })
  );

  const navigator = useNavigate();

  const handleChange = (
    index: number,
    field: keyof Participant,
    value: string | boolean
  ) => {
    const updated = [...participants];
    updated[index] = { ...updated[index], [field]: value };
    setParticipants(updated);
  };

  const handleNumChange = (value: number) => {
    setNumPeople(value);
    setParticipants(
      Array(value).fill({ name: "", phone: "", note: "", ageUnder6: false })
    );
    
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Steps Tabs */}
      <div className="flex justify-center mb-6 gap-2">
        <button className="bg-teal-500 text-white px-4 py-2 rounded">
          ข้อมูลผู้ซื้อ
        </button>
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
          ข้อมูลการชำระเงิน
        </button>
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
          ยืนยันการซื้อแล้ว
        </button>
      </div>

      {/* Header Card */}
      <div className="bg-white p-6 rounded-lg shadow mb-6 w-3/4 mx-auto">
        <h2 className="text-lg font-bold">ไหว้พระ สุพรรณ อิ่มบุญอิ่มใจ</h2>
        <h3 className="mb-2">กำหนดการ 5 ธ.ค. 2568 [ 1 Day ]</h3>
        <h2 className="text-3xl font-bold mb-4">1,899 ฿ / คน</h2>
        <label className="block mb-1">จำนวนคนที่เข้าร่วมทริป</label>
        <select
          value={numPeople}
          onChange={(e) => handleNumChange(Number(e.target.value))}
          className="border rounded px-2 py-1 cursor-pointer"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {/* Participant Forms */}
      {participants.map((person, index) => (
        <ParticipantForm
          key={index}
          index={index}
          data={person}
          onChange={handleChange}
        />
      ))}

      {/* Continue Button */}
      <div
        onClick={() => navigator("/trips/payment")}
        className="w-3/4 mx-auto flex justify-end"
      >
        <button className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600 cursor-pointer">
          ต่อไป
        </button>
      </div>
    </div>
  );
}

export default PurchaserDetails;
