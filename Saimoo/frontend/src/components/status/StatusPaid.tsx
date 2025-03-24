import { useState } from "react";

const StatusPaid = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [status, setStatus] = useState<"จ่ายแล้ว" | "ยกเลิกแล้ว">("จ่ายแล้ว");

  const handleCancelConfirm = () => {
    setStatus("ยกเลิกแล้ว");
    setShowPopup(false);
  };

  return (
    <div className="text-right">
      {/* ปุ่มยกเลิก */}
      {status === "จ่ายแล้ว" ? (
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => setShowPopup(true)}
        >
          ยกเลิกทริป
        </button>
      ) : (
        <span className="inline-block px-3 py-2 rounded bg-red-100 text-red-600 font-semibold cursor-pointer">
          ยกเลิกแล้ว
        </span>
      )}

      {/* Popup ยืนยัน */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
            <h3 className="text-lg font-bold mb-4">ยืนยันการยกเลิกทริป</h3>
            <div className="flex justify-center gap-4">
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded cursor-pointer"
                onClick={handleCancelConfirm}
              >
                ยืนยัน
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
                onClick={() => setShowPopup(false)}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusPaid;
