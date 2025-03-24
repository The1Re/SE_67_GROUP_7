import { useState } from "react";
import ClaimForm from "./ClaimForm";
const StatusInProgress = () => {
  const [showCode, setShowCode] = useState<string | null>(null);

  // Mock data รายชื่อลูกทริป
  const participants = [
    { name: "นางสาว ก ", code: "GUSGs" },
    { name: "นางสาว ข ", code: "ABC12" },
  ];

  return (
    <div>
      {/* รายชื่อแนวตั้ง */}
      <div className="mt-4 pt-4">
        <h3 className="font-semibold mb-2">รายชื่อ</h3>
        <div className="flex flex-col gap-2">
          {participants.map((p, idx) => (
            <div key={idx} className="flex justify-between items-center px-4 py-2 rounded">
              <div>
                <p>{p.name}</p>
                <p className="text-sm text-gray-500"></p>
              </div>
              <button
                onClick={() => setShowCode(p.code)}
                className="bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600 cursor-pointer"
              >
                ดู code
              </button>
            </div>
          ))}

          <ClaimForm />

        </div>
      </div>

      {/* Popup แสดง code */}
      {showCode && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white px-6 py-4 rounded-lg shadow-md text-center">
            <p className="font-semibold mb-2">Identity CODE</p>
            <p className="text-2xl font-bold font-mono">{showCode}</p>
            <button
              onClick={() => setShowCode(null)}
              className="mt-4 text-sm text-gray-500 underline cursor-pointer"
            >
              ปิด
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusInProgress;
